import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './data/escuela.db', // se crea automáticamente
  logging: false,
});

export default sequelize;
