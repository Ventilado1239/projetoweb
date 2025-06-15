// models/Comment.js
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      Comment.belongsTo(models.Post, { foreignKey: 'postId', as: 'post' });
      Comment.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      Comment.hasMany(models.Rating, { foreignKey: 'commentId', as: 'ratings' }); // LINHA ADICIONADA
    }
  }
  Comment.init({
    content: { type: DataTypes.TEXT, allowNull: false }
  }, { sequelize, modelName: 'Comment', tableName: 'comments' });
  return Comment;
};