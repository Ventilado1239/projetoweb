'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    static associate(models) {
      // Uma Tag pode pertencer a muitos Usuários através da tabela UserTag
      Tag.belongsToMany(models.User, { through: models.UserTag, foreignKey: 'tagId', as: 'users' });
    }
  }
  Tag.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Tag',
    tableName: 'tags'
  });
  return Tag;
};