const { Product } = require('../models/index')

class Controller {
  static postProduct(req, res, next) {
    let inputData = {
      name: req.body.name,
      img_url: req.body.img_url,
      price: req.body.price,
      stock: req.body.stock
    }
    Product
      .create(inputData)
      .then((data) => {
        res.status(201).json(data)
      })
      .catch((err) => {
        next(err)
      })
  }
  static getProduct(req, res, next) {
    Product
      .findAll({
        order: [['id', 'ASC']]
      })
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        next(err)
      })
  }
  static getProductById(req, res, next) {
    let checkParams = req.params.id
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
  static putProduct(req, res, next) {
    let checkParams = req.params.id
    let inputData = {
      name: req.body.name,
      img_url: req.body.img_url,
      price: req.body.price,
      stock: req.body.stock
    }
    Product
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
        console.log(err);
        next(err)
      })
  }
  static deleteProduct(req, res, next) {
    let checkParams = req.params.id
    Product
      .destroy({
        where: {
          id: +checkParams
        }
      })
      .then((data) => {
        res.status(200).json({ message: 'Product success deleted' })
      })
      .catch((err) => {
        next(err)
      })
  }
}

module.exports = Controller