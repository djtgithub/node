var express = require('express');
const path = require('path'); //系统路径模块

var app = express();
var bodyParser = require('body-parser'); //解析,用req.body获取post参数
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var bodyParser = require('body-parser'); //中间件  作用是对post请求的请求体进行解析
var serveStatic = require('serve-static');
// app.use(express.static(path.join(__dirname, 'public'))); //指定静态文件目录
var querystring = require('querystring');
//跨域解决办法

app.use((req, res, next) => {
    // 允许的请求主机名及端口号 也可以用通配符*， 表示允许所有主机请求
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8081');
    // 允许请求携带cookie 
    res.setHeader('Access-Control-Allow-Credentials', true);
    // 允许的请求方式
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // 允许的请求头
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
});

// app.all('*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//     res.header("X-Powered-By", ' 3.2.1')
//         //这段仅仅为了方便返回json而已
//     res.header("Content-Type", "application/json;charset=utf-8");
//     if(req.method == 'OPTIONS') {
//         //让options请求快速返回
//         res.sendStatus(200); 
//     } else { 
//         next(); 
//     }
// });


var MongoClient = require('mongodb').MongoClient;
var Baseurl = "mongodb://localhost:27017/Magiccat";

//接口123
app.post('/register', function(req, res) {
    //接收到的参数
    req = req.body;
    console.log(req.username);
    res.set('Content-Type', 'text/html;charset=utf-8');
    //首先得从数据库里找到数据
    var delData = function(db, callback) {
        //连接到数据库
        var dbo = db.db("Magiccat");
        var Data;
        //注册时候先去表里查找该用户名是否存在
        dbo.collection("user").find({ "username": req.username }).toArray(function(err, data) {
            if (err) {
                console.log('error' + err);
                return;
            }
            console.log('查询结果222222222' + data);
            if (data.length > 0) { //找到相同的用户名提示已经注册
                callback(data);
            } else {
                var json = { "username": req.username, "password": req.usernme, "email": req.email };
                dbo.collection("user").insert(json, function(err, data) {
                    if (err) {
                        console.log('error' + err);
                        return;
                    }
                    callback(data);

                });
            }
        });

    }
    MongoClient.connect(Baseurl, function(err, db) {
        console.log('连接成功')
        delData(db, function(result) {
            console.log('查询结果' + result);
            var presence = '',
                msg = '注册成功',
                status = 200;
            if (result.length > 0) {
                msg = "该用户名已经存在";
                status = 202;
            }

            var result = {
                'code': status,
                'data': result,
                'msg': msg
            }
            res.json(result);
            db.close();
        })
    });

});

//接口wdltest
app.post('/login', function(req, res) {
    res.set('Content-Type', 'text/html;charset=utf-8');
     //接收到的参数
    req = req.body;
    console.log(req.username);
    //首先得从数据库里找到数据
    var delData = function(db, callback) {
        //连接到数据库
        var dbo = db.db("Magiccat");
        var Data;
        //链接到数据文档
        dbo.collection("user").find({ "username": req.username }).toArray(function(err, data) {
            if (err) {
                console.log('error' + err);
                return;
            }
            console.log('data'+data);
            if (data.length > 0) { //找到相同的用户名提示已经注册
                callback(data);
            } 
        });
        
    }
    MongoClient.connect(Baseurl, function(err, db) {
        delData(db, function(restult) {
             console.log('连接成功'+restult);
             // if(req.usernma==)
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