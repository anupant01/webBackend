var express = require('express');
var app = new express();
const bodyParser = require('body-parser');
var multer = require('multer');

var path = require('path');

var fs = require('fs');

var cors = require('cors');


var userController = require('./controllers/usersController');
const loginController = require('./controllers/loginController');


//this will parse jason data in form body that arrives from client browser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//------------------------------------------------
//this is the first middleware - application middleware , all routes hit this middleware first
app.use(function (req, res, next) {

	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'content-type');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type', 'application/json');
	next();

})






//-------------------multer-------------------------------------------------

//--------------------user profile

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


// ---------------------------------craft-------------------------

var craftStorage = multer.diskStorage({
	destination: './images/craft',
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


var uploads = multer({
	storage: craftStorage,
	fileFilter: imageFileFilter,
	limits: { fileSize: 10000000 }
})

var craftImageUpload = uploads.single('craftimage');

//------------user-------------------
// userController.validator, userController.hashGenerator, userController.registerUser,
app.post('/v1/register', imageUpload, userController.validator, userController.hashGenerator, userController.registerUser,
	function (req, res, next) {
		console.log(req.body);
		// res.setHeader();
		// res.json(req.file);
		res.status(201);
		res.send({ "message": "User registered successfully" });
	});


app.post('/v1/sign', loginController.validate, loginController.confirm, loginController.jwtTokenGen, loginController.sendUserData,
	function (req, res, next) {
		res.status(200);
		res.send(
			{
				"message": "Login success !",
				"token": req.genToken,
				"result": result
			}
		);

	});

	// app.post('/v1/auth', loginController.validate, loginController.confirm,
	// function (req, res, next) {
	// 	res.status(200);
	// 	res.send({'message':'succesfully login'});

	// });


app.get("/v1/register", userController.getUser,
	function (req, res, next) {


	});

app.delete("/v1/register/:id", userController.deleteUser, function (req, res, next) {
		// console.log(req.params.id);
		res.status(201);
		//message after successfully post
		res.send({ "message": "User successfully deleted" })
		next();
	
	})



//-----------------------craft----------------------------------

const craftController = require('./controllers/craftController');

app.post('/v1.0/addcraft', craftImageUpload, craftController.craftAdd,
	function (req, res, next) {
		console.log(req.body)
		// console.log(req.body.craftprice)
		res.status(201);
		res.send({ "message": "Craft successfully added" });
	});


app.get("/v1.0/addcraft", craftController.getCraft,
	function (req, res, next) {


	});


app.delete("/v1/addcraft/:id", craftController.deleteCraft, function (req, res, next) {
	// console.log(req.params.id);
	res.status(201);
	//message after successfully post
	res.send({ "message": "Craft successfully deleted" })
	next();

})


app.get('/v1.0/addcraft:id', craftController.getindividualCraft, function (req, res) {
	console.log(req.params.id);
})

app.put('/v1.0/addcraft:id', craftController.updateCraft, function (req, res) {



})

// -------------------------------------------------------------------
var feedbackController = require('./controllers/feedbackController')


app.post('/v1/feedback',feedbackController.feedbackAdd,function (req,res) {
    res.status(201);
    res.send({"message":"Message sent successful"});
});

app.get("/v1/feedback", feedbackController.getFeedback,
	function (req, res, next) {


	});

app.delete("/v1/feedback/:id", feedbackController.deleteFeedback, function (req, res, next) {
	// console.log(req.params.id);
	res.status(201);
	//message after successfully post
	res.send({ "message": "Feedback successfully deleted" })
	next();

})


//error catching
app.use(function (err, req, res, next) {

	res.status(err.status);
	res.send({ "message": err.message });


	console.log(err.status);
	console.log(err.message);
})

/*hosting uploads folder */

// var publicDir = require('path').join(__filename,'/images/craft');
// app.use(express.static(publicDir));

// app.use(express.static('public'));

// //Serves all the request which includes /images in the url from Images folder
// app.use('/images/craft', express.static(__dirname + '/images/craft'));


// app.get("/images/craft",function(req,res,next){
//     res.send(publicDir)
// })


// ---------------------------------------------------------------
const port = process.env.PORT;
app.listen(port, () => {
	try {
		console.log(`server ${port} is running`);
	} catch (error) {
		console.log(`server ${port} is not running`)
	}
});




