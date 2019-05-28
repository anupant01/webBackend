var userModel = require('../models/usersModel');

// console.log(userModel);
//insert
function registerUser(req,res,next){
userModel.User.create({
	firstName: req.body.firstName,
	lastName: req.body.lastName,
	email: req.body.email,
	address: req.body.address,
	username:req.body.username,
	password: req.body.password

})

.then(function(result){

console.log(result);


})
.catch(function(err){


next({"status":500, "message":"DB Error"}) 
next('this is error');

})

}

module.exports={
	registerUser
	
}
// registerUser();







