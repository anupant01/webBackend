var express = require('express');


var app = new express();


app.use(function (req,res,next) {

	res.setHeader('Access-Control-Allow-Origin','*');
	res.setHeader('Access-Control-Allow-Headers','content-type')
	next();
	
})


app.post('/v1/users',
	function(req,res,next){
		
		
})


app.listen(process.env.PORT);
console.log("server is running");