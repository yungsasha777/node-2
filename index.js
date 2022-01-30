const http = require('http');
let totalRequests = 0;

let server = http.createServer(function(request, response) {
    totalRequests++;

    response.end(`
    <div style="display: flex; justify-content: center; align-items: center; flex-direction: column; width: 100%;">
    <h1>Welcome to my server!</h1>
    <h2>Total requests since the server startup: ${totalRequests}</h2>
    </div>
    `);
});

console.log('server online');
server.listen(3000);