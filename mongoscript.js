db.user.insert({_id:'8754623583',username:"ranjith",email:"ranjithreynold@gmail.com",password:"qwerty",location:{logitude:"123",latitude:"123"},status:"online",access:"not verified"})
db.user.find().pretty()
db.user.remove({"_id" : ObjectId("58661708ce3b5029e4f8fb15"})