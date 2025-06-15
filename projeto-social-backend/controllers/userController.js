// controllers/userController.js - VERSÃO FINAL COMPLETA

const { User, Tag } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * Registra um novo usuário.
 */
exports.register = async (req, res) => {
  const { username, email, password, birth_date } = req.body;
  try {
    const password_hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, email, password_hash, birth_date });
    newUser.password_hash = undefined;
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: "Não foi possível registrar o usuário.", error: error.message });
  }
};

/**
 * Realiza o login de um usuário e retorna um token JWT.
 */
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '8h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Ocorreu um erro interno." });
  }
};

/**
 * Busca o perfil do usuário atualmente logado.
 */
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId, {
      attributes: { exclude: ['password_hash'] }
    });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Ocorreu um erro interno.' });
  }
};

/**
 * Encontra usuários que possuem uma tag específica.
 */
exports.findUsersByTag = async (req, res) => {
  try {
    const { tag } = req.query;
    if (!tag) {
      return res.status(400).json({ message: "Parâmetro 'tag' é obrigatório." });
    }
    const users = await User.findAll({
      attributes: { exclude: ['password_hash', 'email'] },
      include: [{
        model: Tag,
        as: 'interests',
        where: { name: tag.toLowerCase().trim() }
      }]
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Ocorreu um erro na busca." });
  }
};