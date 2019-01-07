var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
 
mongoose.connect('mongodb://localhost:27017/runoob');
// 连接的是我本地数据库中的Table库
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
 
// 每一个Schema对应MongoDB中的一个集合（collection）。Schema中定义了集合中文档（document）的格式。
var UserSchema = new mongoose.Schema({
    name: String,
    password: String,
    // status: String
});
const Users = mongoose.model('login', UserSchema);
// 用户访问的是Table库中的login集合
 
{
	// ... 这里面将会放下面的登录，注册，修改密码的代码 ...
	
// 用户注册，向数据库中添加用户数据
router.post('/register', function (req, res) {
    const newUser = new Users({ // 用户传参
        name : req.body.name,
        password : req.body.password,
        // status: req.body.status
    });
    const name = req.body.name;
    Users.find({name: name},(err, docs) => {
        if(docs.length > 0) {
            res.send({isSuccess: false, message: '用户名已存在'})
        } else { // 向logins集合中保存数据
            newUser.save(err => {
                const datas =  err ? {isSuccess: false} : {isSuccess: true, message: '注册成功'}
                res.send(datas);
            });
        }
    })
});

}
 
module.exports = router;
