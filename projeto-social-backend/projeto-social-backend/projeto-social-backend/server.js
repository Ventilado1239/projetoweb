require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./models');

const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const groupRoutes = require('./routes/groupRoutes');
const messageRoutes = require('./routes/messageRoutes');
const tagRoutes = require('./routes/tagRoutes');
const connectionRoutes = require('./routes/connectionRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/connections', connectionRoutes);
app.use('/api/notifications', notificationRoutes);

db.sequelize.sync({ force: false}).then(() => {
  console.log('Banco de dados sincronizado com sucesso. ✅');
  
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });

}).catch(err => {
  console.error('Não foi possível sincronizar o banco de dados: ❌', err);
});
