const http = require('http');
const fs = require('fs');
const path = require('path');
const port = 3000;

let htmlfile;
let cssfile;
let jsfile;

let totalRequests = fs.readFileSync('./totalRequests.txt', 'utf-8');
console.log(totalRequests);

uptodate();

function uptodate() {
    fs.readFile('./web-pages/style.css', function(err, html) {
        if (err) {
            throw err;
        }
        cssfile = html;
    });

    fs.readFile('./web-pages/script.js', 'utf-8', function(err, html) {
        if (err) {
            throw err;
        }
        jsfile = html;
    });

    setTimeout(uptodate, 1000);
};

const server = http.createServer(function(req, res) {
    let filePath;

    totalRequests = fs.readFileSync('./totalRequests.txt', 'utf-8');
    totalRequests++;
    fs.writeFileSync('./totalRequests.txt', totalRequests.toString());
    fs.writeFileSync('./web-pages/script.js', `document.getElementById('requests').innerText = 'Total requests since the server startup: ${totalRequests}';`);

    if (req.url.indexOf('.css') != -1) {
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.write(cssfile);
        res.end();
        return;
    }

    if (req.url.indexOf('.js') != -1) {
        res.writeHead(200, { 'Content-Type': 'text/js' });
        res.write(jsfile);
        res.end();
        return;
    }

    if (req.url == '/') {
        res.writeHeader(200, { "Content-Type": "text/html" });
        filePath = path.join(__dirname, 'web-pages', 'index.html');
    } else if (req.url == '/contacts') {
        res.writeHeader(200, { "Content-Type": "text/html" });
        filePath = path.join(__dirname, 'web-pages', 'contacts.html');
    } else {
        res.writeHeader(404, { "Content-Type": "text/html" });
        filePath = path.join(__dirname, 'web-pages', 'error.html');
    }

    let content = fs.readFileSync(filePath);
    res.end(content);
});

server.listen(port);
console.log(`server running at http://localhost:${port}`)