var express = require('express');
var app = express();
 
// 模拟登录注册接口
var UserController = require('./user/UserController');
app.use('/user', UserController);
 
module.exports = app;
