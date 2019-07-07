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


//get

function getFeedback(req, res, next) {


    feedbackModel.FeedBack.findAll({

        attributes: ['id', 'firstName',  'email', 'feedback']
    })
        .then(function (result) {
            res.json(result);
        })
        .catch(function (err) {

        })
}


//delete
function deleteFeedback(req, res, next) {
    feedbackModel.FeedBack.destroy({
        where: { id: req.params.id }
    })
        .then(function () {
            res.status(200);
            res.send({
                "message": "feedback deleted successfully"
            })

        })
        .catch(function (err) {
            next({ "status": 500, "message": "couldnot deleted" })
        })
    next()
}

module.exports = {
    feedbackAdd,
    getFeedback,
    deleteFeedback
}