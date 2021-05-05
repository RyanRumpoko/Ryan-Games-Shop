const { Product, Cart } = require('../models/index')

class Controller {
  static postCustomerProduct(req, res, next) {
    let checkParams = req.params.productid
    let inputData = {
      UserId: req.decoded.id,
      ProductId: +checkParams,
      quantity: req.body.quantity
    }
    let qtyProduct = 0
    Product
      .findOne({
        where: {
          id: +checkParams
        }
      })
      .then((dataProduct) => {
        qtyProduct = dataProduct.stock
        return Cart.findOne({ where: { ProductId: +checkParams, status: false } })
      })
      .then((dataCart) => {
        if (dataCart) throw { name: 'customError', msg: 'This product already in your cart' }
        else if (inputData.quantity > qtyProduct) throw { name: 'customError', msg: 'Qty over product stock' }
        else return Cart.create(inputData)
      })
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        next(err)
      })
  }
  static getCustomerProduct(req, res, next) {
    Cart
      .findAll({
        include: Product,
        where: {
          UserId: req.decoded.id,
          status: false
        },
        order: [['id', 'ASC']]
      })
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        next(err)
      })
  }
  static getCustomerHistory(req, res, next) {
    Cart
      .findAll({
        include: Product,
        where: {
          UserId: req.decoded.id,
          status: true
        },
        order: [['id', 'ASC']]
      })
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        console.log(err);
        next(err)
      })
  }
  static patchCustomerProduct(req, res, next) {
    let checkParams = req.params.id
    let inputData = {
      status: true
    }
    Cart
      .update(inputData, {
        where: {
          id: +checkParams
        },
        returning: true
      })
      .then((data) => {
        res.status(200).json(data[1][0])
      })
      .catch((err) => {
        next(err)
      })
  }
  static deleteCustomerProduct(req, res, next) {
    let checkParams = req.params.id
    Cart
      .destroy({
        where: {
          id: +checkParams
        }
      })
      .then((data) => {
        res.status(200).json('Success delete product')
      })
      .catch((err) => {
        next(err)
      })
  }
  static getProductById(req, res, next) {
    let checkParams = req.params.productid
    Product
      .findOne({
        where: {
          id: +checkParams
        }
      })
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        next(err)
      })
  }
}

module.exports = Controller