// server.js - VERSÃO FINAL DE ENTREGA

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./models');

// Importação de TODAS as Rotas
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const groupRoutes = require('./routes/groupRoutes');
const messageRoutes = require('./routes/messageRoutes');
const tagRoutes = require('./routes/tagRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Uso de TODAS as Rotas
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/tags', tagRoutes);

// Sincronização e Inicialização Segura

db.sequelize.sync({ force: false }).then(() => {
  console.log('Banco de dados sincronizado com sucesso. ✅');
  
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });

}).catch(err => {
  console.error('Não foi possível sincronizar o banco de dados: ❌', err);
});