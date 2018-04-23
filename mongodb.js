var m=require('mongodb');
var mc=m.MongoClient;
var url='mongodb://admin:@ds049624.mlab.com:49624/mentor';
var _db;
module.exports={
   connecttoserver:function(callback){
     mc.connect(url,function(err,db){

         _db=db;
     })
   },

    getdb:function(){
            return _db;
        }


}
