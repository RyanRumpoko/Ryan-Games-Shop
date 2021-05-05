'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsToMany(models.User, { through: models.Cart, foreignKey: 'ProductId' })
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Name cannot be empty"
        }
      },
      allowNull: false
    },
    img_url: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Image URL cannot be empty"
        },
        isUrl: {
          args: true,
          msg: "Must be an URL"
        }
      }
    },
    price: {
      type: DataTypes.DOUBLE,
      validate: {
        notEmpty: {
          args: true,
          msg: "Price cannot be empty"
        },
        isNumeric: {
          args: true,
          msg: "Price must be number"
        },
        min: {
          args: [0],
          msg: "Price must be greater than zero"
        }
      },
      allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: "Stock cannot be empty"
        },
        isNumeric: {
          args: true,
          msg: "Price must be number"
        },
        min: {
          args: [0],
          msg: "Stock must be greater than zero"
        }
      },
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};