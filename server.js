var app = require('http').createServer(handler)
    , SocketServer = require('socketserver')
    , fs = require('fs')
    , port = Number(process.argv[2])
    , file = process.argv[3];

var server = app.listen(port, function(){
    console.log('express server listening on port ' + port);
});
var socketServer = new SocketServer({
    'force new connection': true
});
socketServer.start(server, 3002);
function handler (req, res) {
    fs.readFile(file,
        function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading file');
            }
            res.writeHead(200);
            res.end(data);
        });
}
