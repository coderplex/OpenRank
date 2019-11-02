'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('UserRoles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
       references: {
            model: 'Users',
            key: 'id'
       }
      },
      RoleId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
       references: {
            model: 'Roles',
            key: 'id'
       }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('UserRoles');
  }
};