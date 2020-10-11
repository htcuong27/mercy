const content = require('fs').readFileSync(__dirname + '/index.html', 'utf-8');

const httpServer = require('http').createServer((req, res) => {
    //serve index.html
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Length', Buffer.byteLength(content));
    res.end(content);
});

const io = require('socket.io')(httpServer);

io.on('connect', socket => {
    console.log('socket');
});

httpServer.listen(3000, () => {
    console.log('go to http://localhost:3000');
});