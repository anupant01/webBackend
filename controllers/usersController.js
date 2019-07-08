var  User =  require('../models/usersModel');
const bcryptjs = require('bcryptjs');
var saltRounds = 10;

// validator
function validator(req, res, next) {
	// console.log(req.body);

	// console.log(req.body.username)
	User.usermodel.findOne({
		where: { username: req.body.username }
	})
		.then(function (result) {
			// console.log(result.dataValues);
			if (result.dataValues != '') {
				next({ "status": 409, "message": 'user already exists' })
			}
		})
		.catch(function (err) {
			next();
		})
}



//hashgenator
function hashGenerator(req, res, next) {

	//plain text password from frontend
	req.body.password

	// console.log(req.body.password)
	bcryptjs.hash(req.body.password , saltRounds)
		.then(function (hash) {
			// console.log(hash);
			req.hashValue = hash;
			next();

		})
		.catch(function (err) {
			console.log(err)
			next()

		})
}



//user register
function registerUser(req, res, next) {
	// console.log(req.body);
	// console.log(req.file.filename);

	User.usermodel.create({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		address: req.body.address,
		username: req.body.username,
		password: req.hashValue,
		images:req.file.filename,
		usertype:'User'
		

	}).then(function (result) {
		next();
		
	}).catch(function (err) {
			next({ "status": 500, "message": "DB Error" });
			console.log(err); 
		});
}



//get user
function getUser(req, res, next) {


    User.usermodel.findAll({

        attributes: ['id', 'firstName', 'lastName', 'email', 'address', 'username','images']
    })
        .then(function (result) {
            res.json(result);
        })
        .catch(function (err) {

        })
}

//delete
function deleteUser(req, res, next) {
    User.usermodel.destroy({
        where: { id: req.params.id }
    })
        .then(function () {
            res.status(200);
            res.send({
                "message": "user deleted successfully"
            })

        })
        .catch(function (err) {
            next({ "status": 500, "message": "couldnot deleted" })
        })
    next()
}




//get user
function viewUser(req, res, next) {


    User.usermodel.findAll({

        attributes: ['firstName', 'lastName', 'email', 'address']
    })
        .then(function (result) {
            res.json(result);
        })
        .catch(function (err) {
			console.log(err);
        })
}






module.exports = {
	registerUser, 
	hashGenerator,
	validator,
	getUser,
	deleteUser,
	viewUser


}










