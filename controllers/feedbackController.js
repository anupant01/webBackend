var feedbackModel = require('../models/feedbackModel');

function feedbackAdd(req, res, next) {
    console.log(req.body)
    feedbackModel.FeedBack.create({

        firstName: req.body.firstName,
        email: req.body.email,
        feedback: req.body.feedback

    })

        .then(function (result) {
            // next({"message":'Craft Added'})
            console.log(result);

        })

        .catch(function (err) {
            console.log(err);

            // next({"status":500, "message":"DB Error"}) 



        })
    next()

}

module.exports = {
    feedbackAdd
}