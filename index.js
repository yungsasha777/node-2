const http = require('http');

let server = http.createServer(function(request, response) {
    response.end('welcome to my server');
});

server.listen(3000);