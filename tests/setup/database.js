import { sequelize } from '../../src/config/database.js';

let transaction;

beforeEach(async () => {
  transaction = await sequelize.transaction();
});

afterEach(async () => {
  await transaction.rollback();
});

export { transaction };
