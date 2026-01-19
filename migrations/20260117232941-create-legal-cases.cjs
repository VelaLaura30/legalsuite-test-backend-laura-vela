'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('legal_cases', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      case_number: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      plaintiff: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      defendant: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      case_type: {
        type: Sequelize.ENUM('civil','criminal','labor','commercial'),
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('pending','assigned','in_progress','resolved'),
        defaultValue: 'pending',
      },
      description: {
        type: Sequelize.TEXT,
      },
      lawyer_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'lawyers', 
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('legal_cases');
  },
};
