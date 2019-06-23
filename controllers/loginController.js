var user = require('../models/usersModel');
var bcryptjs = require('bcryptjs');
var saltRounds = 10; 

    function validate(req, res, next) {

    user.usermodel.findOne({

        where: {
            username: req.body.username
        }
    })
    // user have been already registered
        .then(function(result) {

            // store the user's hash password obtained from database in a variable and pass it through req object
            req.userHashPassword = result.dataValues.password
            next();

        })
        // err denotes the user was not found - > user was not registerd
        .catch(function(err) {

            next({
                "status": 400,
                "message": "Please register first to login"
            })

        })


}

function confirm(req, res, next) {

    // bcrypt.compare( req.body.password,req.userHashPassword)
    bcryptjs.compare( req.body.password,req.userHashPassword)
        .then(function(result) {
            next();

        })
        .catch(function(err) {
            next({
                "status": 400,
                "message": "Password Doesnot match"
            })
        })
}

module.exports =
{

    validate,
    confirm
}