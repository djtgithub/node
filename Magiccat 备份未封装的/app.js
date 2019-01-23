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

var DB = require('./modules/db.js');
//跨域解决办法

app.use((req, res, next) => {
    // 允许的请求主机名及端口号 也可以用通配符*， 表示允许所有主机请求
    // res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Origin', 'http://192.168.109.6:8080');
    // 允许请求携带cookie 
    res.setHeader('Access-Control-Allow-Credentials', true);
    // 允许的请求方式
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // 允许的请求头
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

// var register = require('./register');
// var login = require('./login');
// var carousel = require('./home');
// var search = require('./search');
// var jishidetail =require('./jishi_detail');

// var MongoClient = require('mongodb').MongoClient;
// var Baseurl = "mongodb://localhost:27017/Magiccat";

// MongoClient.connect(Baseurl, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("Magiccat");
//   dbo.collection('jishi_content').aggregate([
//     { $lookup:
//        {
//          from: 'jishi_detail',            // 右集合
//          localField: '_id',    // 左集合 join 字段
//          foreignField: 'gid',         // 右集合 join 字段
//          as: 'orderdetails'           // 新生成字段（类型array）
//        }
//      }
//     ]).toArray(function(err, res) {
//     if (err) throw err;
//     console.log(JSON.stringify(res));
//     db.close();
//   });
// });

// MongoClient.connect(Baseurl, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("Magiccat");
//   dbo.collection('orders').aggregate([
//     { $lookup:
//        {
//          from: 'products',            // 右集合
//          localField: 'product_id',    // 左集合 join 字段
//          foreignField: '_id',         // 右集合 join 字段
//          as: 'orderdetails'           // 新生成字段（类型array）
//        }
//      }
//     ]).toArray(function(err, res) {
//     if (err) throw err;
//     console.log(JSON.stringify(res));
//     db.close();
//   });
// });

//------------------------------------------------------------注册接口-------------------------------------------------------------
app.post('/register', function(req, res) {
    var Data={};
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    DB.find('user', {
        username: username,
        password: password,
        email:email
    }, function(err, data) {
        if(err){
            return;
        }else{
            if (data.length > 0) {
                Data = {
                    code: "202",
                    msg: "该用户名已经存在",
                    data: data
                }
            } else {
              DB.insert('user', {
                    username: username,
                    password: password,
                    email:email
                }, function(err, data) {
                    if(err){
                         Data = {
                            code: "202",
                            msg: "注册失败",
                            data: err
                        }
                        ReturnJson(res,Data);
                    }else{
                        Data = {
                            code: "200",
                            msg: "注册成功",
                            data: data
                        }
                    }
                   ReturnJson(res,Data);
                });
            }
        }
    })
})


function ReturnJson(res,json){
    res.json(json);
}
// app.post('/register',register.register);
// app.post('/register', function(req, res) {
//     //接收到的参数
//     req = req.body;
//     console.log(req.username);
//     res.set('Content-Type', 'text/html;charset=utf-8');
//     //首先得从数据库里找到数据
//     var delData = function(db, callback) {
//         //连接到数据库
//         var dbo = db.db("Magiccat");
//         var Data;
//         //注册时候先去表里查找该用户名是否存在
//         dbo.collection("user").find({ "username": req.username }).toArray(function(err, data) {
//             if (err) {
//                 console.log('error' + err);
//                 return;
//             }
//             console.log('查询结果222222222' + data);
//             if (data.length > 0) { //找到相同的用户名提示已经注册
//                 callback(data);
//             } else {
//                 var json = { "username": req.username, "password": req.password, "email": req.email };
//                 dbo.collection("user").insert(json, function(err, data) {
//                     if (err) {
//                         console.log('error' + err);
//                         return;
//                     }
//                     callback(data);

//                 });
//             }
//         });

//     }
//     MongoClient.connect(Baseurl, function(err, db) {
//         console.log('连接成功')
//         delData(db, function(result) {
//             console.log('查询结果' + result);
//             var presence = '',
//                 msg = '注册成功',
//                 status = 200;
//             if (result.length > 0) {
//                 msg = "该用户名已经存在";
//                 status = 202;
//             }

//             var result = {
//                 'code': status,
//                 'data': result,
//                 'msg': msg
//             }
//             res.json(result);
//             db.close();
//         })
//     });

// });

//------------------------------------------------------------登录接口-------------------------------------------------------------
// app.post('/login',login.login);

app.post('/login', function(req, res) {
    var Data, data;
    var username = req.body.username;
    var password = req.body.password;
    DB.find('user', {
        username: username,
        password: password
    }, function(err, data) {
        if (data.length > 0) {
            data = data;
            Data = {
                code: "200",
                msg: "登录成功",
                data: data
            }
            ReturnJson(res,json)
        } else {
            Data = {
                code: "205",
                msg: "用户名或密码不正确",
                data: ''
            }
            ReturnJson(res,json)
        }
    })

})
// app.post('/login', function(req, res) {
//      //接收到的参数
//     req = req.body;
//     console.log( req.username);
//     //首先得从数据库里找到数据
//     var delData = function(db, callback) {
//         //连接到数据库
//         var dbo = db.db("Magiccat");
//         var Data;
//         //链接到数据文档
//         // dbo.collection("user").find({ "username": req.username }).toArray(function(err, data) {
//         dbo.collection("user").findOne({ "username": req.username,"password":req.password },function(err,data){
//             if (err) {
//                 console.log('error' + err);
//                 return;
//             }
//             if (data!=null) { //找到相同的用户名去匹配用户名跟密码
//                  if(req.username==data.username && req.password==data.password){
//                      //用户名跟密码都相匹配成功  
//                      Data={
//                         code:"200",
//                         msg:"登录成功",
//                         data:data
//                      }
//                  }
//                 callback(Data);
//             }else{
//                 //用户名或密码不正确
//                 Data={
//                         code:"205",
//                         msg:"用户名或密码不正确",
//                         data:''
//                      }
//                 callback(Data);
//             }
//           })

//         // });

//     }
// //-------------------------------------------------------------链接数据库并且操作其他的--------------------------------------------------------
//     MongoClient.connect(Baseurl, function(err, db) {
//         delData(db, function(restult) {
//              console.log('连接成功'+JSON.stringify(restult));
//             var restult = {
//                 'code': restult.code,
//                 'data': restult.data,
//                 'msg':restult.msg
//             }
//             res.status(200);
//             res.json(restult);
//             db.close();
//         })
//     });
// })
//---------------------------------------------------------------轮播图接口---------------------------------------------------------
app.get('/Carousel_map', function(req, res) {
    var data, restult;
    DB.find('Carousel_map', {}, function(err, data) {
        if (data.length > 0) {
            restult = {
                code: "200",
                msg: "请求数据成功",
                data: data
            }
            res.status(200);
            res.json(restult);
        }
    })
});
// app.get('/Carousel_map',carousel.carousel);
//---------------------------------------------------------------首页内容接口---------------------------------------------------------
app.get('/jishi_content', function(req, res) {
    var data, restult;
    DB.find('jishi_content', {}, function(err, data) {
        if (data.length > 0) {
            restult = {
                code: "200",
                msg: "请求数据成功",
                data: data
            }
            res.status(200);
            res.json(restult);
        }
    })
});
// app.get('/jishi_content',carousel.jishicontent);
//---------------------------------------------------------------搜索接口---------------------------------------------------------

// app.get('/search',search.search);
//---------------------------------------------------------------详情接口---------------------------------------------------------
// app.get('/jishi_detail',jishidetail.jishidetail);

//-------------------------------------------------------------配置服务端口--------------------------------------------------------
var server = app.listen(3001, function() {

    var host = server.address().address;

    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
})

// var server = app.listen(3001,'0.0.0.0');