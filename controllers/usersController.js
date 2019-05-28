var userModel = require('../models/usersModel');

// console.log(userModel);
//insert
userModel.User.create({
	firstName:'asha',
	lastName:'karki', 
	email:'a@gmail.com ',
	address:'Bharatpur',
	contactno:'123456',
	username:'asha',
	password:'asha' 
})
.then(function(result){

console.log(result);


})
.catch(function(err){

console.log(err); 

})







