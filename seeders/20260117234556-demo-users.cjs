'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    const adminPassword = await bcrypt.hash('Admin123!', 10);
    const operatorPassword = await bcrypt.hash('Oper123!', 10);

    await queryInterface.bulkInsert('users', [
      {
        id: '0d83c685-2c9a-4ba1-8542-677e06745769',
        username: 'admin',
        password: adminPassword,
        role: 'admin',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: '306c631e-7d4c-4ef6-85c7-81baa0e0bdf3',
        username: 'operator',
        password: operatorPassword,
        role: 'operator',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
