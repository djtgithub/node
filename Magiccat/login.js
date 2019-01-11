var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var Baseurl = "mongodb://localhost:27017/Magiccat";

function login(req, res) {
    //接收到的参数
    req = req.body;
    console.log(req.username);
    //首先得从数据库里找到数据
    var delData = function(db, callback) {
        //连接到数据库
        var dbo = db.db("Magiccat");
        var Data;
        //链接到数据文档
        dbo.collection("user").findOne({ "username": req.username, "password": req.password }, function(err, data) {
            if (err) {
                return;
            }
            if (data != null) { //找到相同的用户名去匹配用户名跟密码
                if (req.username == data.username && req.password == data.password) {
                    //用户名跟密码都相匹配成功  
                    Data = {
                        code: "200",
                        msg: "登录成功",
                        data: data
                    }
                }
                callback(Data);
            } else {
                //用户名或密码不正确
                Data = {
                    code: "205",
                    msg: "用户名或密码不正确",
                    data: ''
                }
                callback(Data);
            }
        })
    }
    //-------------------------------------------------------------链接数据库并且操作其他的--------------------------------------------------------
    MongoClient.connect(Baseurl, function(err, db) {
        delData(db, function(restult) {
            console.log('连接成功' + JSON.stringify(restult));
            var restult = {
                'code': restult.code,
                'data': restult.data,
                'msg': restult.msg
            }
            res.status(200);
            res.json(restult);
            db.close();
        })
    });
}

exports.login = login;