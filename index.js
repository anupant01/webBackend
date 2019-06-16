var express = require('express');

var app = new express();

var bodyParser = require('body-parser');


var userController = require('./controllers/usersController');

const loginController= require('./controllers/loginController');


//this is the first middleware - application middleware , all routes hit this middleware first
app.use(function (req,res,next) {

	res.setHeader('Access-Control-Allow-Origin','*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers','content-type')
	next();
	
})

//this will parse jason data in form body that arrives from client browser
app.use(bodyParser.json());


app.post('/v1/users',userController.validator,userController.hashGenerator,userController.registerUser,
		function(req,res,next){
			console.log('asdsad')
			res.status(201);
			res.send({"message": "User registered"});

		
})


app.post('/v1/sign',loginController.validate,loginController.confirm,
		function(req,res,next){
			res.status(200);
			res.send({'message':'succesfully login'});
			next();

		
})


app.get('/check',(req,res)=>{
	res.end('Hello World!')
})






//error catching
app.use(function(err,req,res,next){

	res.status(err.status);
	res.send({"message":err.message});
})


app.listen(3000,()=>console.log("server is running"));
