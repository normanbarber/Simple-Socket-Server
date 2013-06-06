var io = require('socket.io').listen(3001);

io.sockets.on('connection', function (socket) {

    // 2 listen for the set_name event
    // 2a set the users nickname on the socket
    // 2b emit the event named 'name_set' back to the client
    // 2c send message back to the client
    socket.on('set_name', function(data){
        socket.set('nickname', data.name, function(){
            socket.emit('name_set', data);
//              socket.send(JSON.stringify({type: 'newUser', message: 'Welcome to the simple chat server', name:data.name}));
            socket.broadcast.send(JSON.stringify({type: 'newUser', message: 'Welcome to the simple chat server', name:data.name}));
        });
    });

    // 5 listen for a message from client when submitted
    // 5a parse message
    // 5b save users name to username property on message obj
    // 5b send message back to client
    socket.on('message', function(message){
        message = JSON.parse(message);
        socket.get('nickname', function(err, nickname){
            message.username = nickname;
            socket.send(JSON.stringify(message));
            socket.broadcast.send(JSON.stringify(message));
        });
    });
});