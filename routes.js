var fs=require('fs');
var bodyparser=require('body-parser');
var m=require('mongodb');
var mc=m.MongoClient;

var url='mongodb://localhost:27017/mentor';
var admin=require('./data.js');
var url = 'mongodb://admin:admin@ds049624.mlab.com:49624/mentor';

var urlencoder=bodyparser.urlencoded({extended:false});
var id=require('idgen');
//multer
var multer=require('multer');
var upload=multer({dest:'/tmp/'});


//connecting to mongodb
var db=require('./mongodb');
//var gfs=require('girdfs-stream');
db.connecttoserver(function(err){
    console.log(err);
})


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
var d=db.getdb();
var collection=d.collection('user');

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




});

    //user login
    app.post('/user_login',urlencoder,function(req,res){
        var phone=req.body.phone;
        var password=req.body.password;
        console.log(phone);
        console.log(password);
             var d=db.getdb();
                 var collection=d.collection('user');

                 collection.find({_id:phone,password:password}).forEach(function(x){

                     if(phone==x._id && password==x.password)
                     {
                         console.log(phone+" logged in");
                         res.send('success');
                       admin.no_users_online+=1;
                    console.log(admin.no_users_online);
                     }
                     else{
                         res.send('invalid');
                     }

                 })







    });



app.get('/',function(req,res){


    res.send("Mentor is ONLINE");


});


app.post('/user_product',function (req,res) {
var d=db.getdb();
    var collection=d.collection('product');


    //var imgid1=id(18);
    //var imgid2=id(18);

    //var gridfs=gfs(d.db);

    var img1=req.body.i;
    var img2=req.body.s;

    var pid=id(18);
    var data={
        _id:pid,
        name:req.body.name,
        price:req.body.price,
        tag:[req.body.cat,req.body.sub],
        owner:req.body.phone,
        negotiable:req.body.negotiable,
        n_price:req.body.n_price,
        no_years_used:req.body.no_years_used,
        second_hand:req.body.second_hand,
        img1:img1,
        img2:img2,
        description:req.body.description
    }
collection.insertOne(data,function(err){if(err) console.log("db error")})

    res.send("product Updated");


})


}