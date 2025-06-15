// models/PrivateMessage.js
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PrivateMessage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define a quem a mensagem pertence (remetente e destinatário)
      PrivateMessage.belongsTo(models.User, { foreignKey: 'sender_id', as: 'sender' });
      PrivateMessage.belongsTo(models.User, { foreignKey: 'recipient_id', as: 'recipient' });
    }
  }
  PrivateMessage.init({
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('sent', 'received', 'read'),
      defaultValue: 'sent',
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'PrivateMessage',
    tableName: 'private_messages'
  });
  return PrivateMessage;
};