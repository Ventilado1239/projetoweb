// models/Post.js
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      Post.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      Post.hasMany(models.Comment, { foreignKey: 'postId', as: 'comments' });
      Post.belongsTo(models.Group, { foreignKey: 'groupId', as: 'group' });
      Post.hasMany(models.Rating, { foreignKey: 'postId', as: 'ratings' }); // LINHA ADICIONADA
    }
  }
  Post.init({
    content_type: { type: DataTypes.ENUM('text', 'image', 'video'), allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: true },
    media_url: { type: DataTypes.STRING, allowNull: true }
  }, { sequelize, modelName: 'Post', tableName: 'posts' });
  return Post;
};