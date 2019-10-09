'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    value: DataTypes.ENUM('admin', 'candidate')
  }, {});
  Role.associate = function(models) {
    Role.belongsToMany(models.User, {through: 'UserRole'});
    
  };
  return Role;
};