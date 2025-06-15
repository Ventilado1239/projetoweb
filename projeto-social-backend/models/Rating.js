// models/Rating.js
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    static associate(models) {
      Rating.belongsTo(models.User, { foreignKey: 'userId' });
      Rating.belongsTo(models.Post, { foreignKey: 'postId' });
      Rating.belongsTo(models.Comment, { foreignKey: 'commentId' });
    }
  }
  Rating.init({
    rating_type: {
      type: DataTypes.ENUM('positive', 'negative'),
      allowNull: false
    }
    // As chaves estrangeiras userId, postId, commentId são criadas nas associações
  }, {
    sequelize,
    modelName: 'Rating',
    tableName: 'ratings'
  });
  return Rating;
};