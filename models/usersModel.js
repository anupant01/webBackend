var dbconfig = require('../configs/dbConfigs');

// console.log(dbconfig.sequelize);

const User = dbconfig.sequelize.define('user', {
  // attributes

 id: {
    type: dbconfig.Sequelize.INTEGER,
    allowNull: false,
    autoIncrenment:true,
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
    contactno: {
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
  }

  },
 
{
  // options

  freezeTableName:true,
  tableName:'user_table'
});


//error handling then and catch
User.sync({force:true})
.then(function(result){

	console.log(result)

})
.catch(function(err){

	console.log(err)

})