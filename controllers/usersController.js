var userModel = require('../models/usersModel');

var bcryptjs = require('bcryptjs');

var saltRounds = 10; 


// validator
function validator(req,res,nex){

userModel.User.findOne({

	where:{username:req.body.username}
}) 
.then(function (result){

next({"status":409,"message":"user already exists"} )

})

.catch(function(err){

 	
})
}












//hashgenator
function hashGenerator(req,res,next){

	//plain text password from frontend
req.body.password 
bcryptjs.hash(req.body.password , saltRounds) 
.then(function(hash){

	console.log(hash);
	req.hashValue = hash;
	next();

})
.catch(function(err){

})
 


}
  


//insert
function registerUser(req,res,next){
userModel.User.create({
	firstName: req.body.firstName,
	lastName: req.body.lastName,
	email: req.body.email,
	address: req.body.address,
	username:req.body.username,
	password: req.hashValue

})

.then(function(result){

// console.log(result);
next();

})
.catch(function(err){


next({"status":500, "message":"DB Error"}) 


})

}

module.exports={
	registerUser,hashGenerator
	
}
// registerUser();







