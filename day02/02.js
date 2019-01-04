var finalhandler = require('finalhandler')
var http = require('http')
var serveStatic = require('serve-static')
var url = require("url");
var fs = require("fs");

var MongoClient = require('mongodb').MongoClient;
var Baseurl = "mongodb://localhost:27017/runoob";





// 配置静态资源服务器 将public文件夹静态化出来
var serve = serveStatic('../public', { 'index': ['index.html', 'index.htm'] })

// Create server
var server = http.createServer(function onRequest(req, res) {
    //使用静态资源
    serve(req, res, finalhandler(req, res))
    //配置接口路由
    var pathname = url.parse(req.url).pathname;
    console.log(pathname);
    if (pathname == '/register') {
        //拿到GTE请求参数，就是拿到地址栏中的东西
        var queryJSON = url.parse(req.url, true).query;
        
        MongoClient.connect(Baseurl, function(err, db) {
            if (err) throw err;
            // console.log("数据库已创建!");
            var dbo = db.db("runoob");
            var myobj = { xingming: queryJSON.xingming, age: queryJSON.age, sex: queryJSON.sex };
            dbo.collection("site").insertOne(myobj, function(err, res) {
                if (err) throw err;
                console.log("文档插入成功");
                db.close();
            });
        });

        console.log(queryJSON);
        res.end('nihao');
    }
    // else if(pathname=='login'){



    // }
})

// Listen
server.listen(3000);

console.log("服务器已经运行在3000端口");