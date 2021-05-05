const jwt = require('jsonwebtoken')
const { User } = require('../models/index')

function createToken(payload) {
  return jwt.sign(payload, process.env.SECRET)
}

const authenticate = function (req, res, next) {
  try {
    const token = req.headers.token
    const decoded = jwt.verify(token, process.env.SECRET)
    req.decoded = decoded
    next()
  }
  catch (err) {
    next({ name: 'custom401', msg: 'Invalid token' })
  }
}

const authorize = function (req, res, next) {
  User
    .findOne({
      where: {
        id: req.decoded.id,
        role: "Admin"
      }
    })
    .then((data) => {
      if (!data) {
        throw { name: 'custom401', msg: 'Not Authorized' }
      } else {
        next()
      }
    })
    .catch((err) => {
      if (err.name === 'custom401') {
        next({ name: 'custom401', msg: 'Not Authorized' })
      } else {
        next(err)
      }
    })
}

const authCustomer = function (req, res, next) {
  User
    .findOne({
      where: {
        id: req.decoded.id,
        role: "Customer"
      }
    })
    .then((data) => {
      if (!data) {
        throw { name: 'custom401', msg: 'Not Authorized' }
      } else {
        next()
      }
    })
    .catch((err) => {
      if (err.name === 'custom401') {
        next({ name: 'custom401', msg: 'Not Authorized' })
      } else {
        next(err)
      }
    })
}

module.exports = { createToken, authenticate, authorize, authCustomer }