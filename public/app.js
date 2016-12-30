var express=require('express');
//var connect=require('connect');
var app=express();

function notify(req,res,next)
{
    console.log("request been made");
    next();
}
app.use(notify);
app.use(express.static(__dirname+'/public'))

require('./routes.js')(app);

var server=app.listen(8000,function(){
    console.log("server running in port 8000");
});