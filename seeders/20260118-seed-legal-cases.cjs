'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {

    const [lawyerRows] = await queryInterface.sequelize.query(
      `SELECT id FROM lawyers WHERE status = 'active' ORDER BY created_at ASC;`
    );

    await queryInterface.bulkInsert('legal_cases', [
      {
        id: uuidv4(),
        case_number: 'CASE-001',
        status: 'pending',
        case_type: 'civil',
        plaintiff: 'Empresa ABC S.A.S.',
        defendant: 'Juan Pérez',
        lawyer_id: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        case_number: 'CASE-002',
        status: 'pending',
        case_type: 'criminal',
        plaintiff: 'Estado Colombiano',
        defendant: 'Carlos Gómez',
        lawyer_id: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        case_number: 'CASE-003',
        status: 'pending',
        case_type: 'labor',
        plaintiff: 'Empresa XYZ S.A.S.',
        defendant: 'Juan Rodríguez Martínez',
        lawyer_id: null,
        created_at: new Date(),
        updated_at: new Date()
      },

    
      {
        id: uuidv4(),
        case_number: 'CASE-004',
        status: 'assigned',
        case_type: 'civil',
        plaintiff: 'Constructora Delta S.A.',
        defendant: 'María Fernández',
        lawyer_id: lawyerRows[0]?.id || null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        case_number: 'CASE-005',
        status: 'assigned',
        case_type: 'criminal',
        plaintiff: 'Estado Colombiano',
        defendant: 'Andrés López',
        lawyer_id: lawyerRows[1]?.id || null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        case_number: 'CASE-006',
        status: 'assigned',
        case_type: 'labor',
        plaintiff: 'Empresa Omega Ltda.',
        defendant: 'José Martínez',
        lawyer_id: lawyerRows[2]?.id || null,
        created_at: new Date(),
        updated_at: new Date()
      },


      {
        id: uuidv4(),
        case_number: 'CASE-007',
        status: 'assigned',
        case_type: 'civil',
        plaintiff: 'Inversiones Alfa S.A.',
        defendant: 'Laura Gómez',
        lawyer_id: lawyerRows[0]?.id || null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        case_number: 'CASE-008',
        status: 'assigned',
        case_type: 'criminal',
        plaintiff: 'Estado Colombiano',
        defendant: 'Miguel Herrera',
        lawyer_id: lawyerRows[1]?.id || null,
        created_at: new Date(),
        updated_at: new Date()
      },

      {
        id: uuidv4(),
        case_number: 'CASE-009',
        status: 'resolved',
        case_type: 'civil',
        plaintiff: 'Empresa Beta S.A.S.',
        defendant: 'Carolina Rojas',
        lawyer_id: lawyerRows[2]?.id || null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        case_number: 'CASE-010',
        status: 'resolved',
        case_type: 'labor',
        plaintiff: 'Empresa Gamma Ltda.',
        defendant: 'Felipe Sánchez',
        lawyer_id: lawyerRows[0]?.id || null,
        created_at: new Date(),
        updated_at: new Date()
      },
    ]);


  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('legal_cases', null, {});
  },
};
