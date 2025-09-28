import 'dotenv/config';
import cors from 'cors';
import express from 'express';

import models, { sequelize } from './models/index.js';
import rootRoutes from './routes/root.js';
import sessionRoutes from './routes/session.js';
import userRoutes from './routes/user.js';
import messageRoutes from './routes/message.js';

const startServer = async () => {
  const app = express();
  app.set('trust proxy', true);

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(async (req, res, next) => {
    req.context = {
      models,
    };
    next();
  });

  app.use('/', rootRoutes);
  app.use('/session', sessionRoutes);
  app.use('/users', userRoutes);
  app.use('/messages', messageRoutes);

  const port = process.env.PORT ?? 3000;
  const eraseDatabaseOnSync = process.env.ERASE_DATABASE === 'true';

  try {
    await sequelize.sync({ force: eraseDatabaseOnSync });
    console.log('banco de dados sincronizado');

    if (eraseDatabaseOnSync) {
      await createInitialData();
      console.log('dados iniciais criados');
    }

    app.listen(port, () => {
      console.log(`\nservidor funcionooouuu na porta ${port}`);
      console.log(`   acessar http://localhost:${port}`);
    });
  } catch (error) {
    console.error('não foi possível iniciar o servidor:', error);
  }
};

const createInitialData = async () => {
  await models.User.create(
    {
      username: 'fulano',
      email: 'fulano@example.com',
      messages: [{ text: 'olá, mundo!' }],
    },
    {
      include: [models.Message],
    }
  );
};

startServer();