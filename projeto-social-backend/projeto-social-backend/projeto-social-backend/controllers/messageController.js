const { PrivateMessage, User } = require('../models');
const { Op } = require('sequelize');

exports.sendMessage = async (req, res) => {
  const sender_id = req.userId;
  const recipient_id = req.params.userId;
  const { content } = req.body;
  try {
    const recipient = await User.findByPk(recipient_id);
    if (!recipient) {
      return res.status(404).json({ message: "Destinatário não encontrado." });
    }
    const message = await PrivateMessage.create({
      sender_id,
      recipient_id,
      content
    });
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: "Ocorreu um erro ao enviar a mensagem." });
  }
};

exports.getConversation = async (req, res) => {
  const meId = req.userId;
  const otherUserId = parseInt(req.params.userId, 10);
  try {
    const messages = await PrivateMessage.findAll({
      where: {
        [Op.or]: [
          { sender_id: meId, recipient_id: otherUserId },
          { sender_id: otherUserId, recipient_id: meId }
        ]
      },
      order: [['createdAt', 'ASC']],
      include: [
        { model: User, as: 'sender', attributes: ['id', 'username'] },
        { model: User, as: 'recipient', attributes: ['id', 'username'] }
      ]
    });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Ocorreu um erro ao buscar a conversa." });
  }
};