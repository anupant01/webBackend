var dbconfig = require('../configs/dbConfigs');


const FeedBack= dbconfig.sequelize.define('feedback', {
  // attributes

 id: {
    type: dbconfig.Sequelize.INTEGER,
    allowNull: false,
    autoIncrement:true,
    primaryKey:true
  },
  firstName: {
    type: dbconfig.Sequelize.STRING,
    allowNull: false
  },
    email: {
    type: dbconfig.Sequelize.STRING,
    allowNull: false
    // allowNull defaults to true
  },
  feedback: {
    type: dbconfig.Sequelize.STRING,
    allowNull: false
  }

  },
 
{
  // options

  freezeTableName:true,
  tableName:'feedbacktbl'
});


//error handling then and catch
FeedBack.sync({force:false})
.then(function(result){

	//  console.log(result ,"table created");

})
.catch(function(err){

	console.log(err)

})


module.exports={
  FeedBack
}




