var express = require('express');

var app = new express();

var bodyParser = require('body-parser');


var userController = require('./controllers/usersController');


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
			res.status(201);
			res.send({"message": "User registered successfully"});

		
})

// app.post('/check',(req,res)=>{
// 	console.log(req.body)
// })
app.get('/check',(req,res)=>{
	res.end('Hello World!')
})






//error catching
app.use(function(err,req,res,next){

	res.status(err.status);
	res.send({"message":err.message});
})


app.listen(3000,()=>console.log("server is running"));
