var io = require('socket.io').listen(3001);
io.sockets.on('connection', function (socket) {

    socket.on('set_name', function(data){
        socket.set('username', data.name, function(){
            socket.emit('name_set', data);
            socket.broadcast.send(JSON.stringify({type: 'newUser', message: 'Welcome to the simple chat server', name:data.name}));
        });
    });

    socket.on('message', function(message){
        message = JSON.parse(message);
        socket.get('username', function(err, username){
            message.username = username;
            socket.send(JSON.stringify(message));
            socket.broadcast.send(JSON.stringify(message));
        });
    });
});