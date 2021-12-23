var express=require('express');
var app=new express();  /*实例化*/

app.get('/',function(req,res){
    res.send('index');
});
app.get('/login',function(req,res){
    res.send('login');
});

app.listen(3003,'127.0.0.1');


app.set('view engine','ejs');//使用模板引擎，此时默认在view这个目录上寻找相应的渲染页面。

//登录
app.get('/login',function(req,res){
    res.render('login');//在view目录下找到login.ejs文件来渲染。
})
app.use(express.static('public'));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var MongoClient=require('mongodb').MongoClient;//引入模块
var DbUrl='mongodb://localhost:27017/productmanage';  /*创建连接*/
var ObjectID = require('mongodb').ObjectID;

DB.find('user',{
    username:username,
    password:password
},function(err,data){
    if(data.length>0){
        console.log('登录成功');

    }else{
        //console.log('登录失败');
        res.send("<script>alert('登录失败');location.href='/login'</script>");
    }
})