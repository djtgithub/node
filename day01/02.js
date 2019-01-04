//单线程
var http =require('http');
var a=0;
var server = http.createServer(function(req,res){
     a++;
	res.setHeader('Content-Type','text/html;charset=utf-8')  //设置返回头

	res.end('你好'+a); //现在的新版本可以直接写a
	//res.end('你好'+a.toString()); 以前的版本不支持直接写a，会报错需要转成字符串
});
server.listen(3001,'127.0.0.1');

console.log('服务器已经运行在3800端口');

//**大家访问这个服务器的时候数字会一直累加，证明是单线程的，如果出现错误，所有人就都无法访问了，NodeJs中拥有js所有语言核心语法，甚至包含所有的es6语法

