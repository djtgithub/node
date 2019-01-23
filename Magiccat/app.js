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

//返回结果方法
function ReturnJson(res,json){
    res.json(json);
}



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




//------------------------------------------------------------登录接口-------------------------------------------------------------

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
            ReturnJson(res,Data)
        } else {
            Data = {
                code: "205",
                msg: "用户名或密码不正确",
                data: ''
            }
            ReturnJson(res,Data)
        }
    })

})


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
             ReturnJson(res,restult)
        }
    })
});
// app.get('/Carousel_map',carousel.carousel);
//---------------------------------------------------------------首页内容接口---------------------------------------------------------
app.get('/jishi_content', function(req, res) {
      var req = JSON.parse(req.query.filter);
      // console.log('req'+JSON.stringify(req));
    var data, restult;
    DB.findlimit('jishi_content', req, function(err, data) {
        console.log('appjs'+JSON.stringify(data));
        if (data.data.length > 0) {
            ReturnJson(res,data)
        }
    })
});
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