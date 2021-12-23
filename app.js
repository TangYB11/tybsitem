var express=require('express');
var app=new express();  /*实例化*/

app.get('/',function(req,res){
    res.send('index');
});
app.get('/login',function(req,res){
    res.send('login');
});

app.listen(3003,'127.0.0.1');