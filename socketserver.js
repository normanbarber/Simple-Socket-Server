var io = require('socket.io').listen(3001);
io.sockets.on('connection', function (socket) {

    socket.on('set_name', function(data){
        socket.set('nickname', data.name, function(){
            socket.emit('name_set', data);
            socket.broadcast.send(JSON.stringify({type: 'newUser', message: 'Welcome to the simple chat server', name:data.name}));
        });
    });

    socket.on('message', function(message){
        message = JSON.parse(message);
        socket.get('nickname', function(err, nickname){
            message.username = nickname;
            socket.send(JSON.stringify(message));
            socket.broadcast.send(JSON.stringify(message));
        });
    });
});