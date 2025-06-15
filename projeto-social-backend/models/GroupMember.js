'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GroupMember extends Model {}
  GroupMember.init({
    role: {
      type: DataTypes.ENUM('member', 'admin'),
      allowNull: false,
      defaultValue: 'member'
    }
  }, {
    sequelize,
    modelName: 'GroupMember',
    tableName: 'group_members',
    timestamps: false
  });
  return GroupMember;
};