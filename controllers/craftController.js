var craftModel = require('../models/craftmodels');

//user register
function craftAdd(req,res,next){
    console.log(req.body)
    craftModel.Craft.create({

    craftName: req.body.craftName,
    description: req.body.description,
    origination: req.body.origination,
    craftType: req.body.craftType,
    products: req.body.products,
    price:req.body.price,
    craftimage:req.file.filename
    
    })
    
    .then(function(result){
        // next({"message":'Craft Added'})
        console.log(result);
    
    })
    
    .catch(function(err){
    console.log(err);
    
    // next({"status":500, "message":"DB Error"}) 

    
    
    })
    next()
    
    }
    
    module.exports={
        craftAdd
        
    }