import { sequelize } from '../src/config/sequelize.js';


afterAll(async () => {
  await sequelize.close();
});
