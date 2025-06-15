'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Post, { foreignKey: 'userId', as: 'posts' });
      User.hasMany(models.Comment, { foreignKey: 'userId', as: 'comments' });
      User.belongsToMany(models.Group, { through: models.GroupMember, foreignKey: 'userId', as: 'groups' });
      User.hasMany(models.Rating, { foreignKey: 'userId', as: 'ratings' });
      User.hasMany(models.PrivateMessage, { foreignKey: 'sender_id', as: 'sentMessages' });
      User.hasMany(models.PrivateMessage, { foreignKey: 'recipient_id', as: 'receivedMessages' });
      // Associação final e correta com Tag
      User.belongsToMany(models.Tag, { through: models.UserTag, foreignKey: 'userId', as: 'interests' });
    }
  }
  User.init({
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
    password_hash: { type: DataTypes.STRING, allowNull: false },
    birth_date: { type: DataTypes.DATEONLY, allowNull: false },
    profile_picture_url: { type: DataTypes.STRING, allowNull: true }
  }, { sequelize, modelName: 'User', tableName: 'users' });
  return User;
};