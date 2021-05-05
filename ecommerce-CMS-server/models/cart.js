'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.User)
      Cart.belongsTo(models.Product)
    }
  };
  Cart.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    quantity: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: "Qty cannot be empty"
        },
        isNumeric: {
          args: true,
          msg: "Qty must be number"
        },
        min: {
          args: [0],
          msg: "Qty must be greater than zero"
        }
      },
      allowNull: false
    },
    status: DataTypes.BOOLEAN,
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cart',
  });
  Cart.addHook('beforeCreate', (instance, opt) => {
    instance.status = false
  })
  return Cart;
};