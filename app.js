var express=require('express');
//var connect=require('connect');
var path = require('path');
var app=express();
var bodyparser=require('body-parser');
var favicon=require('serve-favicon');

function notify(req,res,next)
{
    console.log("request been made"+req.url);
    next();
}

app.use(notify);
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(favicon(path.join(__dirname,'public','favicon.ico')));
app.use(express.static(__dirname+'/public'))
app.use(express.static(__dirname+'/favicon.ico'))
app.use(bodyparser.json({limit: '50mb'}));
app.use(bodyparser.urlencoded({limit: '50mb', extended: true}));
require('./routes.js')(app);

var server=app.listen(process.env.PORT || 5000,function(){
    console.log("server running in port "+(process.env.PORT || 5000));
});