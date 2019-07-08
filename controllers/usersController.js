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

        attributes: ['id', 'firstName', 'lastName', 'email', 'address', 'username']
    })
        .then(function (result) {
            res.json(result);
        })
        .catch(function (err) {

        })
}

//delete ,'images'
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



//update user
function updateUser(req,res,next){
    User.usermodel.update(
        {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email:req.body.email,
            address:req.body.address
          
        }, {
            where: {
                id: req.params.id
            }
        })
        .then(function(result){
            res.status(201);
            res.send({
                "message":"profile updated"
            })
        })
        .catch(function(err)
        {
            //to show error if any mistake is occured in addEmployee function.
            //extraNote: whenever we write some thing in next by defaultly it
            //will go to error.
            next({"status":500, "message":"Something went wrong"});
            console.log(err)
        })

}






module.exports = {
	registerUser, 
	hashGenerator,
	validator,
	getUser,
	deleteUser,
	updateUser
	


}










