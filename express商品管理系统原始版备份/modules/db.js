//封装数据库

var MongoClient = require('mongodb').MongoClient;

var DbUrl = 'mongodb://localhost:27017/productmanage'; //链接数据库

function _connectDB(callback){

	MongoClient.connect(DbUrl,function(err,db){
		if(err){
			console.log('数据库连接失败');
			return;
		}
		//增加、修改、删除、显示
		
	    callback(err,db);
	})
}


//数据库查找


exports.find=function(collectionname,json,callback){

	console.log(json);
	_connectDB(function(err,db){
        var dbo = db.db("productmanage");
	    var result=dbo.collection(collectionname).find(json);
	    result.toArray(function(err,data){
	    	console.log('datadatda'+data);
	    	db.close();//关闭数据库连接
	     	callback(err,data);//获取到数据之后执行回调函数
	    })

	})
}