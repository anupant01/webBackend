var express = require('express');
var app = new express();
const bodyParser = require('body-parser');
var multer = require('multer');

var path = require('path');

var fs = require('fs');

var userController = require('./controllers/usersController');
const loginController= require('./controllers/loginController');
// const craftController = require('./controllers/craftController');

//this will parse jason data in form body that arrives from client browser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//------------------------------------------------
//this is the first middleware - application middleware , all routes hit this middleware first
app.use(function (req,res,next) {

	res.setHeader('Access-Control-Allow-Origin','*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers','content-type');
	res.setHeader('Access-Control-Allow-Headers','X-Requested-With, content-type');
	next();
	
})


//-------------------multer-------------------------------------------------

var assetStorage = multer.diskStorage({
	destination: './images/upload',
	filename: (req, file, callback) => {
		let ext = path.extname(file.originalname);
		callback(null, file.originalname + '-' + Date.now() + ext);
	}
  });
  
  var imageFileFilter = (req, file, cb) => {
	if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
		return cb(new Error('You can upload only image files!'), false);
	}
	cb(null, true);
  }
  
  
  var upload = multer({
	  storage: assetStorage,
	  fileFilter: imageFileFilter,
	  limits: { fileSize: 10000000 }
  })
  
  var imageUpload = upload.single('images');
  
  


//------------user-------------------
app.post('/v1/register',imageUpload, userController.validator,userController.hashGenerator,userController.registerUser,
		function(req,res,next){
			next();
			res.setHeader('Content-Type', 'application/json');
			res.json(req.file);
			console.log(req.body)
			res.status(201);
			res.send({"message": "User registered successfully"});		
});


app.post('/v1/sign',loginController.validate,loginController.confirm,
		function(req,res,next){
			res.status(200);
			res.send({'message':'succesfully login'});
			next();

		
});


// app.get("/uploads",function(req,res,next){
// 	res.send(publicDir)
// })

//-----------------------craft----------------------------------

// app.post('/v1/addcraft',craftController.CraftAdd,
// 		function(req,res,next){
// 			res.status(200);
// 			res.send({'message':'succesfully added'});
// 			next();

		
// });




//error catching
app.use(function(err,req,res,next){

	res.status(err.status);
	res.send({"message":err.message});


	console.log(err.status);
	console.log(err.message);
})




// ---------------------------------------------------------------
const port = process.env.PORT;
app.listen(port, () => {
	try {
		console.log(`server ${port} is running`);
	} catch (error) {
		console.log(`server ${port} is not running`)
	}
});




