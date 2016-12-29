var fs=require('fs');
var bodyparser=require('body-parser');
var db=require('mongodb');
var mc=db.MongoClient;
var url='mongodb://localhost:27017/mentor';

var urlencoder=bodyparser.urlencoded({extended:false});


module.exports=function(app) {

    app.post('/signup',urlencoder, function (req, res) {

data={
    _id:req.body.phone,
    username:req.body.username,
    email:req.body.email,
    password:req.body.password,
    picture:"D:\mentor\profile\\"+req.body.phone+".png",
    location:{
        longitude:req.body.longitude,
        latitude:req.body.latitude
    },
    status:"online",
access:"not verified"
}
mc.connect(url,function(err,db){
    if(err)
    {
        console.log("mondodb connection error");
    }

else {

var collection=db.Collection('user');
collection.insert(data,function(err)
{
    if(err)
    {
        console.log("user signed up error");
    }
    else
    {
        console.log("user signed up");
    }


})

    }

db.close();
});

});

    app.post('/login',function(req,res){
        var phone=req.body.phone;
        var password=req.body.password;
         mc.connect(url,function(err,db){
             if(err)
             {
                 console.log("mongodb error");
             }
             else
             {
                 var collection=db.Collection('user');
                 collection.findOne({_id:phone},function(err,d){
                     if(d.password==password)
                     {
                         res.end("success");
                     }

                 })
             }
         db.close();
         })


    })

}