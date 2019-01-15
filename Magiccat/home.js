var express = require('express');
var app = express();
const querystring = require('querystring');
var MongoClient = require('mongodb').MongoClient;
var Baseurl = "mongodb://localhost:27017/Magiccat";

function carousel(req, res) {
    //首先得从数据库里找到数据
    var delData = function(db, callback) {
        //连接到数据库
        var dbo = db.db("Magiccat");
        var Data;
        //注册时候先去表里查找该用户名是否存在
        dbo.collection("Carousel_map").find().toArray(function(err, data) {
            if (err) {
                console.log('error' + err);
                return;
            }
            callback(data);
        });
    }
    MongoClient.connect(Baseurl, function(err, db) {
        delData(db, function(result) {
            if (result.length > 0) {
                msg = "请求成功";
                status = 200;
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



function jishi_content(req, res) {
    var req = JSON.parse(req.query.filter);
    //首先得从数据库里找到数据
    var totall;
    var limit = req.limit;
    var delData = function(db, callback) {
        //连接到数据库
        var dbo = db.db("Magiccat");
        var Data;
        //查找表里的数据
        var a = db.db("Magiccat").collection("jishi_content").find().count({}, function(err, res) {
            if (err) {
                console.log('error' + err);
                return;
            }
            totall = res;
        });
        dbo.collection("jishi_content").find().skip(2).limit(limit).toArray(function(err, data) {
            if (err) throw err;
            callback(data);
            db.close();
        });

    }
    MongoClient.connect(Baseurl, function(err, db) {
        delData(db, function(result) {
            if (result.length > 0) {
                msg = "请求成功";
                status = 200;
            }
            var result = {
                'code': status,
                'data': result,
                'msg': msg,
                'totall': totall
            }
            res.json(result);
            db.close();
        })
    });
}

exports.carousel = carousel;
exports.jishicontent = jishi_content;