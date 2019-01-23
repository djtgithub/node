var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var Baseurl = "mongodb://localhost:27017/Magiccat";


function register(req, res) {
    //接收到的参数
    req = req.body;
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
            if (data.length > 0) { //找到相同的用户名提示已经注册
                callback(data);
            } else {
                var json = { "username": req.username, "password": req.password, "email": req.email };
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
        delData(db, function(result) {
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
}

exports.register = register;
