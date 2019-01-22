var express = require('express');
var app = new express();
var md5 = require('md5-node');
var bodyParser = require('body-parser');
//设置bodyparse中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var DB = require('./modules/db.js');


//保存用户信息
var session = require('express-session');
//配置中间件  固定格式
//
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 30 //过期时间 30分钟不操作就过期
    },
    rolling: true //在每次请求时强行设置cookie，这将重置cookie过期时间，（默认： false）

}))

// 使用ejs 模板引擎   默认查找views这个目录
app.set('view engine', 'ejs');


//配置publick目录为静态资源目录
app.use(express.static('public'));


//ejs 中设置全局数据 所有的页面都可以使用
// app.locals['userinfo']='';

// 自定义中间件 判断登录状态

app.use(function(req, res, next) {

    if (req.url == '/login' || req.url == '/doLogin') {
        next();
    } else {
        //判断有没有登录
        if (req.session.userinfo && req.session.userinfo.username != '') {
            next();
        } else {
            res.redirect('/login');
        }
    }
})


app.get('/', function(req, res) {
    console.log(req.body)
    res.send('index');
})



//登录
app.get('/login', function(req, res) {
    res.render('login');
})


app.post('/doLogin', function(req, res) {
    var username = req.body.username;
    var password = md5(req.body.password); //对用户输入的密码加密
    //获取数据
    //链接数据库查询数据
    DB.find('user', {
        "username": username,
        "password": password
    }, function(err, data) {
        if (data.length > 0) {
            req.session.userinfo = data[0]; //保存用户信息
            app.locals['userinfo'] = req.session.userinfo; //配置全局变量
            res.redirect('/product'); //登录成功跳转到商品页面
        } else {
            res.send("<script>alert('登录失败');location.href='/login'</script>");
        }
    })
})


//商品列表

app.get('/product', function(req, res) {

    DB.find('product', {}, function(err, data) {

        res.render('product', {
            list: data
        });
    })

})


app.get('/productadd', function(req, res) {

    res.render('productadd');

})

app.get('/productedit', function(req, res) {

    res.render('productedit');

})


app.get('/productdelete', function(req, res) {

    res.send('product');

})


app.get('/loginOut', function(req, res) {
    req.session.destroy(function(err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('./login');
        }
    })

})


app.get('/delete',function(req,res){
   DB.deleteOne('product',{"title":"iphone6"},function(err,data){
    if(!err){
        res.send('删除数据成功');
    }
   })
})



app.listen(3000, function() {
    console.log('监听3000端口')
});