var {Craft} = require('../models/craftmodels');

//user register
function CraftAdd(req,res,next){
   Craft.create({
        craftName: req.body.craftName,
        description: req.body.craftDesc,
        origination: req.body.craftOrigin,
        type: req.body.craftType,
        products: req.body.product,
        price:req.body.craftPrice
    
    })
    
    .then(function(result){
        // next({"message":'Craft Added'})
    
    })
    
    .catch(function(err){
    
    
    next({"status":500, "message":"DB Error"}) 
    
    
    })
    next()
    
    }
    
    module.exports={
        CraftAdd
        
    }