import { sequelize } from './sequelize.js';

export const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log(' La base de datos se conectó correctamente.');
  } catch (error) {
    console.error('No se puede conectar a la base de datos: ', error);
    process.exit(1);
  }
};
