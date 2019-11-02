'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserRole = sequelize.define('UserRole', {

  }, {});
  UserRole.associate = function(models) {
    // associations can be defined here
  };
  return UserRole;
};