//封装数据库
var MongoClient = require('mongodb').MongoClient;

var DbUrl = 'mongodb://localhost:27017/productmanage'; //链接数据库



function _connectDB(callback){

	MongoClient.connect(DbUrl,function(err,db){
		if(err){
			console.log('数据库连接失败');
			return;
		}
		//增加、修改、删除、显示等
	    callback(err,db);
	})
}


//查询数据
exports.find=function(collectionname,json,callback){
	_connectDB(function(err,db){
        var dbo = db.db("productmanage");
	    var result=dbo.collection(collectionname).find(json);
	    result.toArray(function(err,data){
	    	db.close();//关闭数据库连接
	     	callback(err,data);//获取到数据之后执行回调函数
	    })

	})
}

//增加数据
exports.insert=function(collectionname,json,callback){
	_connectDB(function(err,db){
		var dbo = db.db("productmanage");
		dbo.collection(productmanage).insertOne(json,function(err,data){
			callback(err,data);
		});
	})
}

//修改数据
exports.update=function(collectionname,json1,json2,callback){
	_connectDB(function(err,db){
		var dbo = db.db("productmanage");
		dbo.collection(productmanage).updateOne(json1,{$set:json2},function(err,data){
			callback(err,data);
		});
	})
}

//删除数据
exports.deleteOne=function(collectionname,json,callback){
	_connectDB(function(err,db){
		var dbo = db.db("productmanage");
		dbo.collection(collectionname).deleteOne(json,function(err,data){
			callback(err,data);
		});
	})
}