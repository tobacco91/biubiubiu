var http = require('http');
var querystring = require("querystring");
var url = require('url');
var fs = require('fs');
var path = require('path');
var listener = http.createServer(function(req,response) {
    var pathname = url.parse(req.url).pathname;
    console.log(url.parse(req.url))
    var realPath = "view" + pathname;
    fs.exists(realPath, function (exists) {
        if (!exists) {
            response.writeHead(404, {
                'Content-Type': 'text/plain'
            });

            response.write("This req URL " + pathname + " was not found on this server.");
            response.end();
        } else {
            fs.readFile(realPath, "binary", function (err, file) {
                if (err) {
                    response.writeHead(500, {
                        'Content-Type': 'text/plain'
                    });

                    response.end(err);
                } else {
                    response.writeHead(200, {
                        'Content-Type': 'text/html'
                    });

                    response.write(file, "binary");

                    response.end();
                }
            });
        }
    });

    var post = '';
    req.on('data', function(chunk) {
        post += chunk;
    })
    
    req.on('end', function() { 
        var params = querystring.parse(post);
        console.log(params);
        //response.end('1');
    })


    
}).listen(8080)