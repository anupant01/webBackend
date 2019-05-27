var Sequelize = require('sequelize');

var sequelize = new Sequelize('craft','root','',{

	host: 'localhost',
	dialect : 'mysql',
	logging: false
});

//authentication 
sequelize.authenticate()
.then(function(){
	console.log("database sucessfully connected");
})
.catch(function(err)
{
	console.log(err); 

})


// module exports
module.exports=
{
	Sequelize,
	sequelize
}