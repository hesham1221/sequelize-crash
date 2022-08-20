'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Posts}) {
      // define association here
      this.hasMany(Posts , {foreignKey : 'userId' , as :'posts'})
    }
    toJSON(){
      return {...this.get() , id :undefined}
    }
  }
  User.init({
    uuid : {
      type : DataTypes.UUID,
      defaultValue : DataTypes.UUIDV4
    },
    name: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {msg : 'user cant\'t be null'},
        notEmpty : {msg : 'user can\'t be empty'}
      }
    },
    email: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {msg : 'email cant\'t be null'},
        notEmpty : {msg : 'email can\'t be empty'},
        isEmail : {msg : 'email has to be a valid email'}
      }
    },
    role: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {msg : 'role cant\'t be null'},
        notEmpty : {msg : 'role can\'t be empty'}
      }
    }
  }, {
    sequelize,
    tableName : 'users',
    modelName: 'User',
  });
  return User;
};