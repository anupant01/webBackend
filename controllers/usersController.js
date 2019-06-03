var {User} = require('../models/usersModel');

var bcryptjs = require('bcryptjs');

var saltRounds = 10; 

// validator
function validator(req,res,next){
	console.log(req.body.username)
	User.findOne({
		where : {username:req.body.username}
	})
		.then(function(result){
			console.log(result.dataValues);
			if (result.dataValues != ''){
				next({"status":409,"message":'user already exists'})
			}
				// console.log('user exists')
				// res.sendStatus(409)

		})
		.catch(function(err){
			next();
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
next()
})
 


}
  


//user register
function registerUser(req,res,next){
User.create({
	firstName: req.body.firstName,
	lastName: req.body.lastName,
	email: req.body.email,
	address: req.body.address,
	username:req.body.username,
	password: req.hashValue

})

.then(function(result){

console.log(result);
next();

})
.catch(function(err){


next({"status":500, "message":"DB Error"}) 


})

}

module.exports={
	registerUser,hashGenerator,validator
	
}








