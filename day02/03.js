//这个案例演示post请求通过formidable来处理参数




var finalhandler = require('finalhandler')
var http = require('http')
var serveStatic = require('serve-static')
var url = require("url");
var fs = require("fs");
var formidable = require('formidable');
var path=require('path');

// 配置静态资源服务器 将public文件夹静态化出来
var serve = serveStatic('../public', { 'index': ['formidable.html', 'formidable.htm'] })

// Create server
var server = http.createServer(function onRequest(req, res) {
    //使用静态资源
    serve(req, res, finalhandler(req, res))
    //配置接口路由
    var pathname = url.parse(req.url).pathname;
    console.log(pathname);

    if (pathname == '/upload') {
        //创建一个表单的实例
        var form = new formidable.IncomingForm();
        //设置上传的文件存放在哪里
        form.uploadDir = "../uploads" //uloads必须是存在的文件夹
        //处理表单
        form.parse(req, function(err, fields, files) {
            ///fields普文本域
            //files表示文件控件
            if(!files.photo){
            	return;
            }
            if(!files.photo.name ){
            	res.end('请上传东西');
            	return;
            }
            console.log(files.photo);
            //拓展名
            var extname=path.extname(files.photo.name);
            //改名  因为formidable天生传输的文件是没有拓展名的
            //fs的rename方法用来改名
            fs.rename(files.photo.path,files.photo.path+extname,function(){
            	res.end('上传成功');
            });
            

        });

        return;
    }

    serve(req, res, finalhandler(req, res));
})

// Listen
server.listen(3000);

console.log("服务器已经运行在3000端口");