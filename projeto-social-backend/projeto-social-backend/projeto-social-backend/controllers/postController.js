const { Post, User, Comment, Group, GroupMember, Rating } = require('../models');

exports.createPost = async (req, res) => {
  try {
    const { content_type, content, media_url, groupId } = req.body;
    const userId = req.userId;
    if (groupId) {
      const membership = await GroupMember.findOne({ where: { userId: userId, groupId: groupId } });
      if (!membership) {
        return res.status(403).json({ message: "Acesso negado. Você não é membro deste grupo." });
      }
    }
    const newPost = await Post.create({
      content_type, content, media_url, userId,
      groupId: groupId || null
    });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: "Não foi possível criar o post.", error: error.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      order: [['createdAt', 'DESC']],
      include: [
        { model: User, as: 'user', attributes: ['id', 'username', 'profile_picture_url'] },
        { model: Group, as: 'group', attributes: ['id', 'name'] }
      ]
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Ocorreu um erro ao buscar os posts." });
  }
};

exports.addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;
    const userId = req.userId;
    const newComment = await Comment.create({ content, postId, userId });
    res.status(201).json(newComment);
  } catch (error) {
    res.status(400).json({ message: "Não foi possível adicionar o comentário." });
  }
};

exports.ratePost = async (req, res) => {
  const { postId } = req.params;
  const userId = req.userId;
  const { rating_type } = req.body;

  if (!['positive', 'negative'].includes(rating_type)) {
    return res.status(400).json({ message: "Tipo de avaliação inválido." });
  }
  try {
    const existingRating = await Rating.findOne({ where: { userId, postId } });
    if (existingRating) {
      if (existingRating.rating_type === rating_type) {
        await existingRating.destroy();
        return res.status(200).json({ message: "Avaliação removida." });
      } else {
        existingRating.rating_type = rating_type;
        await existingRating.save();
        return res.status(200).json({ message: "Avaliação alterada.", rating: existingRating });
      }
    } else {
      const newRating = await Rating.create({ rating_type, userId, postId });
      return res.status(201).json({ message: "Avaliação registrada.", rating: newRating });
    }
  } catch (error) {
    res.status(500).json({ message: "Ocorreu um erro ao processar sua avaliação." });
  }
};