'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      notEmpty: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      notEmpty: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      notEmpty: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      notEmpty: true,
      allowNull: false,
    },
  });
  User.associate = function(models) {
    User.belongsToMany(models.Role, {through: 'UserRole'}); 
  };
  return User;
};
