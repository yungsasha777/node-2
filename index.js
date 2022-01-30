const http = require('http');
const fs = require('fs');
const path = require('path');
let totalRequests = 0;

let server = http.createServer(function (request, response) {
    totalRequests++;
    let filePath;
    let stylePath;
    if (request.url == '/'){
        filePath = path.join(__dirname, 'web-pages', 'index.html');
        stylePath = path.join(__dirname, 'web-pages', 'style.css');
    } else if (request.url == '/contacts'){
        filePath = path.join(__dirname, 'web-pages', 'contacts.html');
        stylePath = path.join(__dirname, 'web-pages', 'style.css');
    } else {
        response.writeHead(404);
        filePath = path.join(__dirname, 'web-pages', 'error.html');
        stylePath = path.join(__dirname, 'web-pages', 'style.css');
    };

    let content = fs.readFileSync(filePath);
    let css = fs.readFileSync(__dirname + '/web-pages' + '/style.css', 'utf8')
    response.writeHead(200, {'Content-Type': 'text/css'});
    response.write(css);
    response.end(content);
});

console.log('server online');
server.listen(3000);