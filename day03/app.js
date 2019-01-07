var express = require('express');
const path = require('path'); //系统路径模块
var app = express();
var bodyParser = require('body-parser'); //中间件  作用是对post请求的请求体进行解析
var serveStatic = require('serve-static');
app.use(express.static(path.join(__dirname, 'public'))); //指定静态文件目录


//跨域解决办法
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
        //这段仅仅为了方便返回json而已
    res.header("Content-Type", "application/json;charset=utf-8");
    if(req.method == 'OPTIONS') {
        //让options请求快速返回
        res.sendStatus(200); 
    } else { 
        next(); 
    }
});


var MongoClient = require('mongodb').MongoClient;
var Baseurl = "mongodb://localhost:27017/runoob";


var questions = [{
        data: 213,
        num: 444,
        age: 12
    },
    {
        data: 456,
        num: 678,
        age: 13
    }
];


//接口123
app.get('/123', function(req, res) {

    res.set('Content-Type', 'text/html;charset=utf-8');
    //首先得从数据库里找到数据
    var delData = function(db, callback) {
    //链接到数据文档
        var dbo = db.db("runoob");
            dbo.collection("site").find().toArray(function(err, data) {
                if (err) {
                    console.log('error' + err);
                    return;
                }
                callback(data)
            });
    }
    MongoClient.connect(Baseurl, function(err, db) {
        console.log('连接成功')
        delData(db, function(restult) {
            var restult = {
                'code': 200,
                'data': restult
            }
            res.status(200);
            res.json(restult);
            db.close();
        })
    });

});

//接口wdltest
app.post('/wdltest', function(req, res) {
    res.set('Content-Type', 'text/html;charset=utf-8');
    //首先得从数据库里找到数据
    var delData = function(db, callback) {
    //链接到数据文档
        var dbo = db.db("runoob");
        var myobj =  [
        { name: '菜鸟工具', url: 'https://c.runoob.com', type: 'cn'},
        { name: 'Google', url: 'https://www.google.com', type: 'en'},
        { name: 'Facebook', url: 'https://www.google.com', type: 'en'}
       ];
        dbo.collection("site").insertMany(myobj, function(err, data) {
         if (err) {
                    console.log('error' + err);
                    return;
                }
            console.log("插入的文档数量为: " + data.insertedCount);
             callback(data)
        });
    }
    MongoClient.connect(Baseurl, function(err, db) {
        console.log('连接成功')
        delData(db, function(restult) {
            var restult = {
                'code': 200,
                'data': restult
            }
            res.status(200);
            res.json(restult);
            db.close();
        })
    });
})

//配置服务端口
var server = app.listen(3001, function() {

    var host = server.address().address;

    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
})