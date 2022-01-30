const http = require('http');
const fs = require('fs');
const path = require('path');
let totalRequests = 0;

let server = http.createServer(function (request, response) {
    totalRequests++;
    let filePath;
    if (request.url == '/'){
        filePath = path.join(__dirname, 'web-pages', 'index.html');
    } else if (request.url == '/contacts'){
        filePath = path.join(__dirname, 'web-pages', 'contacts.html');
    } else {
        response.writeHead(404);
        filePath = path.join(__dirname, 'web-pages', 'error.html');
    };

    let content = fs.readFileSync(filePath);
    response.end(content);
});

console.log('server online');
server.listen(3000);