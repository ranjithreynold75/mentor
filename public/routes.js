var fs=require('fs');
var bodyparser=require('body-parser');
var m=require('mongodb');
var mc=m.MongoClient;
var url = 'mongodb://admin:admin@ds049624.mlab.com:49624/mentor';

var urlencoder=bodyparser.urlencoded({extended:false});


module.exports=function(app) {


    //user request for profile pic
    app.post('/pro_pic',urlencoder,function(req,res){
        var phone=req.body.phone;
        console.log("profilepic request by "+phone);
        //var data=fs.readFileSync("./profile/"+phone+".jpg");

        fs.readFile("../profile/"+phone+".jpg",function(err,data){
            if(err)
                console.log("error retrivel");
            else
            {
                var profilepic=new Buffer(data).toString("base64");
                console.log('encoded success');
                res.send(profilepic);

            }
        })
    })









    app.post('/user_signup',urlencoder,function (req, res)
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

var image=req.body.profile_image;
        var bitmap=new Buffer(image,"base64");
        fs.writeFile("./profile/"+req.body.phone+".jpg",bitmap,function(err,data){
            if(err)
            {
                console.log("error on picture upload");
            }
            else
            {
                console.log("picture uploaded");
            }

        })
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
            shop_owner: "no",
            profile_image:"/profile/"+req.body.phone+".jpg"
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

                 collection.find({_id:phone,password:password}).forEach(function(x){

                     if(phone==x._id && password==x.password)
                     {
                         console.log(phone+" logged in");
                         res.send('success');

                     }
                     else{
                         res.send('invalid');
                     }

                 })


             }

         })


    });



app.get('/',function(req,res){
    res.send("welcome to mentor");
});


}