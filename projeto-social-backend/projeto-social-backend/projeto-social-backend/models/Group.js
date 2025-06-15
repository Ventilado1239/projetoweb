'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    static associate(models) {
      // Um grupo tem muitos membros (usuários) através da tabela GroupMember
      Group.belongsToMany(models.User, { through: models.GroupMember, foreignKey: 'groupId', as: 'members' });
      // Um grupo pode ter muitos posts
      Group.hasMany(models.Post, { foreignKey: 'groupId', as: 'groupPosts' });
    }
  }
  Group.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Group',
    tableName: 'groups'
  });
  return Group;
};