const http = require('http');
const fs = require('fs');

module.exports = {
    callback: async() => {
        searchParams = new URLSearchParams(data);
        console.log(searchParams.get('author'));
        console.log(searchParams.get('content'));

        let htmlToAppend = `
        <div class="article">
            <h3>Author: ${searchParams.get('author')}</h3>
            <p>${searchParams.get('content')}</p>
        </div>
        `;

        await fs.appendFileSync('./web-pages/index.html', htmlToAppend);
        await res.end();
    }
}