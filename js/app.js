var express=require('express');
//var connect=require('connect');
var app=express();


app.use(express.static(__dirname+'/public'))

require('./routes.js')(app);

var server=app.listen(8000,function(){
    console.log("server running in port 8000");
});