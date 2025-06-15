// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Pega o token do cabeçalho da requisição (header)
  // O formato padrão é "Bearer TOKEN"
  const authHeader = req.headers.authorization;

  // 1. Verifica se o cabeçalho de autorização existe
  if (!authHeader) {
    return res.status(401).json({ message: 'Acesso negado. Nenhum token fornecido.' });
  }

  // 2. Divide o cabeçalho para pegar apenas o token (ignora o "Bearer ")
  const parts = authHeader.split(' ');
  if (parts.length !== 2) {
    return res.status(401).json({ message: 'Erro no formato do token.' });
  }

  const [scheme, token] = parts;
  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ message: 'Token mal formatado.' });
  }

  // 3. Verifica se o token é válido
  try {
    // jwt.verify vai decodificar o token usando nosso segredo
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Adiciona o id do usuário (que estava no token) ao objeto da requisição
    // para que as próximas rotas possam usá-lo
    req.userId = decoded.id;

    // Se tudo deu certo, chama a próxima função (o controller da rota)
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido ou expirado.' });
  }
};

module.exports = authMiddleware;