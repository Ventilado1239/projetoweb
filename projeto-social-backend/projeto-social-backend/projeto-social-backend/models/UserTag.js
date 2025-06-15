'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserTag extends Model {}
  UserTag.init({}, {
    sequelize,
    modelName: 'UserTag',
    tableName: 'user_tags',
    timestamps: false
  });
  return UserTag;
};