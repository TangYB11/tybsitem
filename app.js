var express=require('express');
var app=new express();  /*实例化*/

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine','ejs');//使用模板引擎，此时默认在view这个目录上寻找相应的渲染页面。

app.use(express.static('public'));

var session = require("express-session");
//配置中间件
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge:1000*60*30
    },
    rolling:true
}))


app.use(function(req,res,next){
    //console.log(req.url);
    //next();
    if(req.url=='/login' || req.url=='/doLogin'){
        next();
 
    }else{
 
        if(req.session.userinfo&&req.session.userinfo.username!=''){   /*判断有没有登录*/
 
            app.locals['userinfo']=req.session.userinfo;   /*配置全局变量  可以在任何模板里面使用*/
            next();
        }else{
            res.redirect('/login')
        }
    }
 
 })

app.get('/',function(req,res){
    res.send('index');
});
app.get('/login',function(req,res){
    res.render('login');
});

//登录
app.get('/login',function(req,res){
    res.render('login');//在view目录下找到login.ejs文件来渲染。
})




var MongoClient=require('mongodb').MongoClient;//引入模块
var DbUrl='mongodb://localhost:27017/addmange';  /*创建连接*/
var ObjectID = require('mongodb').ObjectID;

//获取登录提交的数据
app.post('/doLogin',function(req,res){

    var username=req.body.username;
    var password=req.body.password; 
    //1.获取数据
    //2.连接数据库查询数据
    DbUrl.find('user',{
        username:username,
        password:password
    },function(err,data){
        if(data.length>0){
            console.log('登录成功');
            //保存用户信息
            req.session.userinfo=data[0];
            res.redirect('/product');  /*登录成功跳转到商品列表*/
        }else{
            //console.log('登录失败');
            res.send("<script>alert('登录失败');location.href='/login'</script>");
        }
    })
})


app.listen(50523);