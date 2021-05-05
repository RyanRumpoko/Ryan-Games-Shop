'use strict';
const {
  Model
} = require('sequelize');
const { hashingPassword } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Product, { through: models.Cart, foreignKey: 'UserId' })
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Name cannot be empty"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Email cannot be empty"
        }
      },
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Password cannot be empty"
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Role cannot be empty"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.addHook('beforeCreate', (instance, opt) => {
    instance.password = hashingPassword(instance.password)
  })
  User.addHook('beforeCreate', (instance, opt) => {
    instance.role = 'Customer'
  })
  return User;
};