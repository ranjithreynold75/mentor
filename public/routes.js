var fs=require('fs');
var bodyparser=require('body-parser');
var m=require('mongodb');
var mc=m.MongoClient;
var url='mongodb://localhost:27017/mentor';

var urlencoder=bodyparser.urlencoded({extended:false});


module.exports=function(app) {




    app.post('/user_signup',urlencoder, function (req, res)
    {
mc.connect(url,function(err,db){
    if(err)
    {
        console.log("mondodb connection error");
    }

else {

var collection=db.collection('user');

var curser=collection.find({_id:req.body.phone});

        curser.count(function(err,c){

    if(c==0) {
        data = {
            _id: req.body.phone,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            //picture:"D:\mentor\profile\\"+req.body.phone+".png",
            location: {
                longitude: req.body.longitude,
                latitude: req.body.latitude
            },
            city: req.body.city,
            state: req.body.state,
            status: "online",
            access: "not verified",
            shop_owner: "no"

        };


        collection.insertOne(data, function (err) {
            if (err) {
                console.log("user signed up error");
            }
            else {
                res.send("Welcome to Mentor");
                console.log("user signed up"+req.body.username);
            }


        })

    }

    else
    {
        res.send("User already exit");
    }
        })

    }


});

});

    //user login
    app.post('/user_login',urlencoder,function(req,res){
        var phone=req.body.phone;
        var password=req.body.password;
        console.log(phone);
        console.log(password);
        mc.connect(url,function(err,db){
             if(err)
             {
                 console.log("mongodb error");
             }
             else
             {
                 var collection=db.collection('user');

                 collection.find({_id:phone},function(err,d){
                     if(d.password==password)
                     {
                         res.send("success");
                     }

                     else
                     {
                         res.send("invalid");
                     }

                 })
             }

         })


    })

app.get('/',function(req,res){
    res.end("welcome to Mentor");
})



}