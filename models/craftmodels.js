var dbconfig = require('../configs/dbConfigs');

// console.log(dbconfig.sequelize);

const Craft = dbconfig.sequelize.define('craft', {
  // attributes

 id: {
    type: dbconfig.Sequelize.INTEGER,
    allowNull: false,
    autoIncrement:true,
    primaryKey:true
  },
  craftName: {
    type: dbconfig.Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: dbconfig.Sequelize.STRING,
     allowNull: false
  },
    origination:{
    type: dbconfig.Sequelize.STRING,
    allowNull: false
    // allowNull defaults to true
  },
  craftType: {
    type: dbconfig.Sequelize.STRING,
    allowNull: false
    // allowNull defaults to true
  },
  products: {
    type: dbconfig.Sequelize.STRING,
      allowNull: false
        // allowNull defaults to true
      },
   price: {
    type: dbconfig.Sequelize.STRING,
    allowNull: false
    // allowNull defaults to true
  }
  ,
  craftimage: {
    type: dbconfig.Sequelize.STRING,
    allowNull: false
    //allowNull defaults to true
  }
  



  },
 
{
  // options

  freezeTableName:true,
  tableName:'crafttbl'
});


//error handling then and catch
Craft.sync({force:false})
.then(function(result){

	console.log(result ,"table created")

})
.catch(function(err){

	console.log(err)

})


module.exports={
Craft
}