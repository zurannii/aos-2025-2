// ex01-express/api/models/index.js

import 'dotenv/config';
import Sequelize from 'sequelize';

import getUserModel from './user.js';
import getMessageModel from './message.js';

if (!process.env.POSTGRES_URL) {
  throw new Error('A variável de ambiente POSTGRES_URL não está definida. Verifique seu arquivo .env');
}

const sequelize = new Sequelize(process.env.POSTGRES_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: true, // Deixe como 'true' por enquanto para vermos os logs do SQL
});

const models = {
  User: getUserModel(sequelize, Sequelize),
  Message: getMessageModel(sequelize, Sequelize),
};

// ESSA É A PARTE IMPORTANTE:
// Executa o método .associate de cada modelo para criar as relações
Object.keys(models).forEach((key) => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };
export default models;