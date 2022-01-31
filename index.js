const http = require('http');
const fs = require('fs');
const path = require('path');
const port = 3000;

let htmlfile;
let cssfile;

uptodate();

function uptodate() {
    fs.readFile('./web-pages/style.css', function(err, html) {
        if (err) {
            throw err;
        }
        cssfile = html;
    });

    setTimeout(uptodate, 1000);
};

const server = http.createServer(function(req, res) {
    let filePath;

    if (req.url.indexOf('.css') != -1) {
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.write(cssfile);
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
