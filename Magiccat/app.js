var express = require('express');
const path = require('path'); //系统路径模块

var app = express();
var bodyParser = require('body-parser');//解析,用req.body获取post参数
 app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
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
    req=JSON.stringify(req.body);
    res.set('Content-Type', 'text/html;charset=utf-8');
    //首先得从数据库里找到数据
    var delData = function(db, callback) {
    //链接到数据文档
        var dbo = db.db("Magiccat");
            dbo.collection("user").find().toArray(function(err, data) {
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