var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var Baseurl = "mongodb://localhost:27017/Magiccat";

function search(req, res){

    console.log('搜索页数据'+req.query.filter);
    var req=new RegExp(JSON.parse(req.query.filter));
    console.log(req)


    // var limit=req.query.filter.limit;
    // var limit=req.limit;
    var delData = function(db, callback) {
        //连接到数据库
        var dbo = db.db("Magiccat");
        //查找表里的数据
        dbo.collection("jishi_content").find({name:req}).toArray(function(err, data) {
        if (err) throw err;
        console.log('查询结果222222222'+data);
        callback(data);
        db.close();
  });
 }


    MongoClient.connect(Baseurl, function(err, db) {
        console.log('连接成功')
        delData(db, function(result) {
            console.log('查询结果' + result);
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
