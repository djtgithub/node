var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var Baseurl = "mongodb://localhost:27017/Magiccat";

function search(req, res){
    var req=new RegExp(JSON.parse(req.query.filter));
    var delData = function(db, callback) {
        //连接到数据库
        var dbo = db.db("Magiccat");
        //查找表里的数据
        dbo.collection("jishi_content").find({name:req}).toArray(function(err, data) {
        if (err) throw err;
        callback(data);
        db.close();
  });
 }


    MongoClient.connect(Baseurl, function(err, db) {
        delData(db, function(result) {
            var status,msg;
            if (result) {
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

exports.search=search;
