var http=require('http');
var server=http.createServer(function(req,res){
    res.setHeader('Content-Type','text/html');
    // res.writeHead(200,{'Content-Type':'text/plain'});
     res.end('<h1>hello world</h1>');
})


server.listen(800)
