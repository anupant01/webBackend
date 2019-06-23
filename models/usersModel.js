var dbconfig = require('../configs/dbConfigs');


const usermodel = dbconfig.sequelize.define('user', {
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
  lastName: {
    type: dbconfig.Sequelize.STRING,
     allowNull: false
  },
    email: {
    type: dbconfig.Sequelize.STRING,
    allowNull: false
    // allowNull defaults to true
  },
   address: {
    type: dbconfig.Sequelize.STRING,
    allowNull: false
    // allowNull defaults to true
  },
  username: {
    type: dbconfig.Sequelize.STRING,
    allowNull: false
  },

  password: {
    type: dbconfig.Sequelize.STRING,
    allowNull: false
  },
    images: {
    type: dbconfig.Sequelize.STRING,
    allowNull: false
    //allowNull defaults to true
  },

  usertype: {
    type: dbconfig.Sequelize.STRING,
    allowNull: false
  }

  },
 
{
  // options

  freezeTableName:true,
  tableName:'usertbl'
});


//error handling then and catch
usermodel.sync({force:true})
.then(function(result){

	 console.log(result);

})
.catch(function(err){

	console.log(err)

})


module.exports={
  usermodel
}




  // images: {
  //   type: dbconfig.Sequelize.STRING,
  //   allowNull: false
    // allowNull defaults to true

//}