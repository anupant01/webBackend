var express = require('express');
var app = new express();
const bodyParser = require('body-parser');
var multer = require('multer');

var path = require('path');

var fs = require('fs');

var cors = require('cors');

var swaggerUi = require("swagger-ui-express");
var swaggerJSDoc = require("swagger-jsdoc");

var swaggerDefinition = {

	info: {
		// API informations (required)
		title: 'Craft Info', // Title (required)
		version: 'v1.0.1', // Version (required)
		description: 'API documentation', // Description (optional)
	},
	host: 'localhost:7000', // Host (optional)
	basePath: '/', // Base path (optional)
	securityDefinitions : {
		bearerAuth : {
			type: 'apiKey',
			name: 'authorization',
			scheme : 'bearer',
			in : 'header'
		}
	}
}

var options = {
	swaggerDefinition,
	apis:['./index.js']
}

const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, options));




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

// ----------------multer-----------------craft-------------------------

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
app.post('/v1/register',  userController.validator, userController.hashGenerator, userController.registerUser,
	function (req, res, next) {
		console.log(req.body);
		res.status(201);
		res.send({ "message": "User registered successfully" });
	});


/**
 * Login Testing
 * @swagger
 * /v1/sign:
 *   post:
 *     tags:
 *      - Users
 *     name: Resigister name
 *     summary: This API login a single  user
 *     description: login a single user
 *     produces: application/json
 *     parameters:
 *     - name: user
 *       in: body
 *       schema:
 *         type: object
 *         properties:
 *          username:
 *           type: string
 *          password:
 *           type: string
 *     responses:
 *       200:
 *         description: Login success
 *       500:
 *        description: DB Error
 *
 */

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
		// req.json("message": "Login success !")

	});




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
const usermodel = require('./models/usersModel')
app.get("/v1/user/:id",
	function (req, res, next) {
		console.log(req.params.id);
		usermodel.usermodel.findAll({
			where:{id:req.params.id}
			
		})
			.then(function (result) {
			
				res.json(result);
				console.log(result)
			})
			.catch(function (err) {
				res.json(err)
				console.log(err);
			})


	});


	app.put("/v1/user/:id",userController.updateUser,function (req,res) {
	
		res.send({"message":"user data updated successfully"});
	});
	

//-----------------------craft----------------------------------

const craftController = require('./controllers/craftController');

// /**
//  * Craft Testing
//  * @swagger
//  * /v1.0/addcraft:
//  *   post:
//  *     tags:
//  *      - Item
//  *     name: Add Craft
//  *     summary: This API add one craft at a Time
//  *     description: Add a single craft
//  *     produces: application/json
//  *     parameters:
//  *     - name: craft
//  *       in: body
//  *       schema:
//  *         type: object
//  *         properties:
//  *          craftName:   
//  *           type: string
//  *          description:
//  *           type: integer
//  *          origination:
//  *           type: string
//  *          craftType:
//  *           type: string
//  * 			products:
//  * 			type: string
//  *  		price:
//  * 			type: string
//  * 			craftimage:
//  * 			type: string
//  *     responses:
//  *       201:
//  *         description:Craft added
//  *       500:
//  *        description: Database Error
//  *
//  */

app.post('/v1.0/addcraft', craftImageUpload, craftController.craftAdd,
	function (req, res, next) {
		console.log(req.body)
		// console.log(req.body.craftprice)
		res.status(201);
		res.send({ "message": "Craft successfully added" });
	});

/**
 * @swagger
 * /v1.0/addcraft:
 *   get:
 *     tags:
 *       - Craft
 *     name: Find Crafts
 *     summary: Finds all Craft from database
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A single user object
 *       500:
 *         description: No auth token
 */
app.get("/v1.0/addcraft", craftController.getCraft,
	function (req, res, next) {


});

/**
 * @swagger
 * /v1/addcraft/{id}:
 *   delete:
 *     tags:
 *       - Craft
 *     description: Deletes a single Craft
 *     summary: Delete Craft
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: craftid
 *         description: craft's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
app.delete("/v1/addcraft/:id", craftController.deleteCraft, function (req, res, next) {
	// console.log(req.params.id);
	res.status(201);
	//message after successfully post
	res.send({ "message": "Craft successfully deleted" })
	next();

})


/**
 * @swagger
 *  /v1.0/addcraft/{id}:
 *   get:
 *     tags:
 *       - Craft
 *     name: Find Craft
 *     summary: Finds individual Craft by Craft id in database
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: craft
 *         description: craft's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A single user object
 *       500:
 *         description: No auth token
 */

app.get('/v1.0/addcraft:id', craftController.getindividualCraft, function (req, res) {
	console.log(req.params.id);
})

app.put('/v1.0/addcraft:id', craftController.updateCraft, function (req, res) {



})


app.get('/v1/craftView',craftController.viewCraft,function (req,res,next) {

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

/*hosting uploads folder for craft */

var publicDir = require('path').join(__filename,'/images/craft');
app.use(express.static(publicDir));

app.use(express.static('public'));

//Serves all the request which includes /images in the url from Images folder
app.use('/images/craft', express.static(__dirname + '/images/craft'));


app.get("/images/craft",function(req,res,next){
    res.send(publicDir)
})

// /*hosting uploads folder for user */
// var publicDir = require('path').join(__filename,'/images/upload');
// app.use(express.static(publicDir));

// app.use(express.static('public'));

// //Serves all the request which includes /images in the url from Images folder
// app.use('/images/upload', express.static(__dirname + '/images/upload'));


// app.get("/images/upload",function(req,res,next){
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

module.exports= app;


