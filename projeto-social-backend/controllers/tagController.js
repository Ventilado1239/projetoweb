const { Tag, UserTag } = require('../models');
const sequelize = require('../config/database');

exports.addTagsToUser = async (req, res) => {
  const userId = req.userId;
  const { tags } = req.body;

  if (!tags || !Array.isArray(tags) || tags.length > 5) {
    return res.status(400).json({ message: "Formato inválido. Envie um array com até 5 tags." });
  }

  const t = await sequelize.transaction();
  try {
    // Remove as tags antigas do usuário para garantir uma atualização limpa
    await UserTag.destroy({ where: { userId: userId }, transaction: t });

    // Para cada nome de tag, encontra ou cria no banco
    const tagPromises = tags.map(tagName => {
      return Tag.findOrCreate({
        where: { name: tagName.toLowerCase().trim() },
        transaction: t
      }).then(result => result[0]);
    });
    const tagInstances = await Promise.all(tagPromises);

    // Cria as novas associações na tabela user_tags
    const userTagPromises = tagInstances.map(tag => {
      return UserTag.create({ userId: userId, tagId: tag.id }, { transaction: t });
    });
    await Promise.all(userTagPromises);

    await t.commit();
    res.status(200).json({ message: "Tags atualizadas com sucesso!" });

  } catch (error) {
    await t.rollback();
    res.status(500).json({ message: "Ocorreu um erro ao atualizar as tags." });
  }
};