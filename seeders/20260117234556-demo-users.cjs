'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        id: '0d83c685-2c9a-4ba1-8542-677e06745769',
        username: 'admin',
        password: '$2b$10$hashdelapassword',
        role: 'admin',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: '306c631e-7d4c-4ef6-85c7-81baa0e0bdf3',
        username: 'operator1',
        password: '$2b$10$hashdelapassword',
        role: 'operator',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
