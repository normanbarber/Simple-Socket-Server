var app = require('http').createServer(handler)
    , fs = require('fs')
    , port = Number(process.argv[2])
    , file = process.argv[3];

app.listen(port);

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
