var craftModel = require('../models/craftmodels');

//craft register
function craftAdd(req, res, next) {
    console.log(req.body)
    craftModel.Craft.create({

        craftName: req.body.craftName,
        description: req.body.description,
        origination: req.body.origination,
        craftType: req.body.craftType,
        products: req.body.products,
        price: req.body.price,
        craftimage: req.file.filename

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


//get craft
function getCraft(req, res, next) {


    craftModel.Craft.findAll({

        attributes: ['id', 'craftName', 'description', 'origination', 'craftType', 'products', 'price','craftimage']
    })
        .then(function (result) {
            res.json(result);
        })
        .catch(function (err) {

        })
}


//delete
function deleteCraft(req, res, next) {
    craftModel.Craft.destroy({
        where: { id: req.params.id }
    })
        .then(function () {
            res.status(200);
            res.send({
                "message": "craft deleted successfully"
            })

        })
        .catch(function (err) {
            next({ "status": 500, "message": "couldnot deleted" })
        })
    next()
}



function getindividualCraft(req,res){
    craftModel.Craft.findOne({
        where:{id:req.params.id}
    })
        .then(function (result) {
            res.status(200);
            res.json(result);
            
        })
        .catch(function(err){
            res.json(err);
        })
    }
    

 

//update
function updateCraft(req, res) {
    craftModel.Craft.update({
        craftName: req.body.craftName,
        description: req.body.description,
        origination: req.body.origination,
        craftType: req.body.craftType,
        products: req.body.products,
        price: req.body.price
    }, {
            where: {
                id: req.params.id
            }
        })
        .then(function (result) {
            res.status(201);
            res.send({
                "message": "Craft updated successfully"
            })
        })
        .catch(function (err) {

            console.log(err);

        })
}




module.exports = {
    craftAdd,
    getCraft,
    deleteCraft,
    getindividualCraft,
    updateCraft

}