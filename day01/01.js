//读取内置模块http，这个模块开发服务器用的
var http =require('http');

var server=http.createServer(function(req,res){
	res.setHeader('Content-Type','text/html;charset=utf-8'); //不设置uft-8编码格式输出到页面的内容是乱码的
	var a=1;
	var b=2;
	res.end('<h1>第一个node程序</h1>'+(a+b));   //输出内容到页面上    并且可以运算
})
//监听3000端口号
server.listen(3000,"127.0.0.1"); //端口号必须是第一个参数，第一个参数"127.0.0.1"可以不写，不写的时候局域网内就都可以访问，否则就无法访问

console.log('服务器已经运行在3000端口')


//node.js修改任何东西都得重启服务器，否则不生效
//js运行在服务端
//NodeJs 没有根目录的概念
//使用js开始开发服务器 get post请求   数据库的增删改查  cookie session 路由    没有服务器架构 