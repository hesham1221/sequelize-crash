'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    toJSON(){
      return {...this.get() , userId : undefined ,id:undefined}
    }
    static associate({User}) {
      // define association here
      this.belongsTo(User , {foreignKey : 'userId' , as : 'user'})
    }
  }
  Post.init({
    body: {
      type : DataTypes.STRING,
      allowNull : false
    },
    uuid : {
      type : DataTypes.UUID,
      defaultValue : DataTypes.UUIDV4
    },
  }, {
    sequelize,
    tableName :'posts',
    modelName: 'Posts',
  });
  return Post;
};