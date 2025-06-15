const { Group, GroupMember } = require('../models');

exports.createGroup = async (req, res) => {
  const { name, description } = req.body;
  const userId = req.userId;
  try {
    const newGroup = await Group.create({ name, description });
    await GroupMember.create({
      role: 'admin',
      groupId: newGroup.id,
      userId: userId
    });
    // Garante que o objeto retornado é um JSON simples, evitando erros
    res.status(201).json(newGroup.toJSON());
  } catch (error) {
    res.status(400).json({ message: "Não foi possível criar o grupo. O nome já pode estar em uso." });
  }
};

exports.getAllGroups = async (req, res) => {
  try {
    const groups = await Group.findAll({ order: [['createdAt', 'DESC']] });
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ message: "Ocorreu um erro ao buscar os grupos." });
  }
};

exports.joinGroup = async (req, res) => {
  const groupId = parseInt(req.params.groupId, 10);
  const userId = req.userId;
  try {
    const group = await Group.findByPk(groupId);
    if (!group) {
      return res.status(404).json({ message: "Grupo não encontrado." });
    }
    const existingMembership = await GroupMember.findOne({ where: { userId: userId, groupId: groupId } });
    if (existingMembership) {
      return res.status(409).json({ message: "Você já é membro deste grupo." });
    }
    await GroupMember.create({ userId: userId, groupId: groupId, role: 'member' });
    res.status(200).json({ message: `Você entrou no grupo '${group.name}' com sucesso!` });
  } catch (error) {
    res.status(500).json({ message: "Ocorreu um erro ao tentar entrar no grupo." });
  }
};