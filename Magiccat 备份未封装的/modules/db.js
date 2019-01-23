//封装数据库
var MongoClient = require('mongodb').MongoClient;

 var DbUrl = 'mongodb://localhost:27017/Magiccat';


 //连接数据库方法
 
 function _connectDB(callback){
 	MongoClient.connect(DbUrl,function(err,db){
 		if(err){
 			console.log('连接数据库失败');
 			return;
 		}
 		callback(err,db);//增、删、查、改
 	})
 }

 //查询数据

exports.find=function(collectionname,json,callback){
	_connectDB(function(err,db){
		var dbo = db.db('Magiccat');
		var result = dbo.collection(collectionname).find(json);
		result.toArray(function(err,data){
			db.close();//关闭数据库连接
			callback(err,data);//获取到数据之后执行的回调函数
		})
	})
}

//增加数据

exports.insert=function(collectionname,json,callback){
	_connectDB(function(err,db){
		var dbo = db.db('Magiccat');
		var result = dbo.collection(collectionname).insertOne(json,function(err,data){
			callback(err,data);
		})
	})
}

//修改数据

exports.update=function(collectionname,json1,json2,callback){
	_connectDB(function(err,db){
		var dbo = db.db('Magiccat');
		var result = dbo.collection(collectionname).updateOne(json1,{Set:json2},function(err,data){
			callback(err,data);
		})
	})
}

//删除数据

exports.delete=function(collectionname,json,callback){
	_connectDB(function(err,db){
		var dbo = db.db('Magiccat');
		var result = dbo.collection(collectionname).deleteOne(json,function(err,data){
			callback(err,data);
		})
	})
}