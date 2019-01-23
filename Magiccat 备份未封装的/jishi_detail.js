var express = require('express');
var app = express();
const querystring = require('querystring');
var MongoClient = require('mongodb').MongoClient;
var Baseurl = "mongodb://localhost:27017/Magiccat";


function jishidetail(req, res) {
     var req = JSON.parse(req.query.filter);
    //接收到的参数
    var gid = req.id;
    var delData = function(db, callback) {
        //连接到数据库
        var dbo = db.db("Magiccat");
        dbo.collection("jishi_detail").find({"gid":gid}).toArray(function(err, data) {
            if (err) throw err;
            callback(data[0]);
            db.close();
        });
    }
    MongoClient.connect(Baseurl, function(err, db) {
        var status,msg;
        delData(db, function(result) {
            if (result!='') {
                msg = "请求成功";
                status = 200;
            }
            var result = {
                'code': status,
                'data': result,
                'msg': msg,
            }
            res.json(result);
            db.close();
        })
    });
}

exports.jishidetail = jishidetail;