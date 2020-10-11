let app = require('express')();
let http = require('http').createServer(app);
let io = require('socket.io')(http);
let userNames = {};
app.get('/', (req, res) => {
    res.send('hello');
});
io.on('connection', (socket) => {

    console.log('a user connected');
    socket.on('message', (msg) => {
        console.log('msg');
        socket.userNames
        socket.broadcast.emit('message-broadcast', msg);
    });
    socket.on('addUser', (newUser) => {
        socket.userNames = newUser;
        userNames[newUser] = newUser;
        socket.emit('notification', 'SERVER', 'Welcome you enter the chat room!');
        socket.broadcast.emit('notification', 'SERVER', newUser + 'enter the room!');
    
        socket.emit('getListUser', userNames);
    });
    socket.on('disconnect', function(){
		delete userNames[socket.userNames];
		socket.emit('getListUser', userNames);
		socket.broadcast.emit('notification', 'SERVER', socket.username + ' has disconnected');
	});
});



http.listen(3000, () => {
    console.log('listening on port 3000');
})