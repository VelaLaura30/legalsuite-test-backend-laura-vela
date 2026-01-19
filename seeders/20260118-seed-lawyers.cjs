'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('lawyers', [
      {
        id: uuidv4(),
        name: 'Abogado Activo 1',
        email: 'activo1@test.com',
        status: 'active',
        specialization: 'Civil',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Abogado Activo 2',
        email: 'activo2@test.com',
        status: 'active',
        specialization: 'Penal',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Abogado Activo 3',
        email: 'activo3@test.com',
        status: 'active',
        specialization: 'Laboral',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Abogado Inactivo 1',
        email: 'inactivo1@test.com',
        status: 'inactive',
        specialization: 'Civil',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Abogado Inactivo 2',
        email: 'inactivo2@test.com',
        status: 'inactive',
        specialization: 'Penal',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('lawyers', null, {});
  },
};
