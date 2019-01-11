var express = require('express');
var app = express();
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
            console.log('查询结果222222222' + data);
                    callback(data);
        });

    }
    MongoClient.connect(Baseurl, function(err, db) {
        console.log('连接成功')
        delData(db, function(result) {
            console.log('查询结果' + result);
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



function jishi_content(req, res){
	//首先得从数据库里找到数据
    var delData = function(db, callback) {
        //连接到数据库
        var dbo = db.db("Magiccat");
        var Data;
        //注册时候先去表里查找该用户名是否存在
        var a=db.db("Magiccat").collection("jishi_content").find().count();
        	console.log('aaaaaaaaaa'+a);
        dbo.collection("jishi_content").find().toArray(function(err, data) {
        	// var a=dbo.collection("jishi_content").find().count();
        	console.log('aaaaaaaaaa'+JSON.stringify(a));
        	
            if (err) {
                console.log('error' + err);
                return;
            }
            console.log('查询结果222222222' + data);
                    callback(data);
        });



    }
    MongoClient.connect(Baseurl, function(err, db) {
        console.log('连接成功')
        delData(db, function(result) {
            console.log('查询结果' + result);
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

exports.carousel=carousel;
exports.jishicontent=jishi_content;