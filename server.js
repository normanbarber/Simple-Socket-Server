var app = require('http').createServer(handler)
    , io = require('socket.io')
    , fs = require('fs')
    , path = require('path')
    , port = Number(process.argv[2])
    , file = process.argv[3];

app.listen(port);

function handler (req, res) {
    var filePath = req.url;
    console.log('filePath = ' + filePath);
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
