var user = require('../models/usersModel');
var bcryptjs = require('bcryptjs');
// var saltRounds = 10; 
var jwtoken = require('jsonwebtoken');



    function validate(req, res, next) {

    user.usermodel.findOne({

        where: {
            username: req.body.username
        }
    })
    // user have been already registered
        .then(function(result) {

            if (result != null) {
                next();
            } else {
                next({ "status":409,"message":"Credential didn't match" });
            }



        })
        // err denotes the user was not found - > user was not registerd
        .catch(function(err) {

            next({
                "status": 400,
                "message": err
            });

        })


}

function confirm(req, res, next) {
    user.usermodel.findOne({
        where: {username:req.body.username}
    })

        .then(function(result){
            if(result != null){
                bcryptjs.compare(req.body.password, result.dataValues.password, function(err, res) {
                    if(res) {
                        next({"status":200,"message":"Valid User Login."});
                    } else {
                        next({"status":409,"message":"Credential didn't match."});
                    }
                });
            }else{
                next({"status":409,"message":"Credential didn't match."});
            }
        })
        .catch(function(err){
            next({"status":500, "message":"Error Occured"});
        })
        
}

function jwtTokenGen(req, res, next) {

    jwtoken.sign({
            username: req.body.username,
            accessLevel: 'admin'
        }, 'mySecretKey', {
            expiresIn: "10h"
        },

        function(err, token) {
            if(err != null || undefined ){
                console.log(err)
                next({"status":401, "message":"Unauthorized token"})
            }
            else{
                req.genToken=token;
                next();
                console.log(token)
            }

        }
    )

}


function sendUserData(req, res, next) {

    user.usermodel.findOne({
        where: { username: req.body.username }
    })

        .then(function (result) {
            if (result != null) {
                res.json(result)
                next();
                res.send(
                    {
                        "message": "Login success !",
                        "token": req.genToken,
                        "result": result
                    }
                );
            }
        })
        .catch(function (err) {

            next({ "status": 500, "message": err });
        })
}


function tokenVerify(req, res, next) {

    console.log(req.headers)

    if (req.headers.authorization == undefined) {

        next({ status: 500, message: 'no authorization header present' })

    }
    else {

        let token = req.headers.authorization.slice(7, req.headers.authorization.length)

        jwtTokenGen.verify(token, 'mySecretKey', function (err, decoded) {
            console.log(decoded);
            if (err != null) {
                next({ status: 500, message: err.message })
                console.log(err);
            }
            else {
                next();
            }
        })

    }
}

















module.exports =
{

    validate,
    confirm,
    jwtTokenGen,
    tokenVerify,
    sendUserData
}