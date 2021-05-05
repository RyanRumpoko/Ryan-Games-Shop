const { User } = require('../models/index')
const { comparePassword } = require('../helpers/bcrypt')
const { createToken } = require('../middlewares/authenticate')

class Controller {
  static register(req, res, next) {
    let inputData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }
    User
      .create(inputData)
      .then((data) => {
        res.status(201).json(data)
      })
      .catch((err) => {
        next(err)
      })
  }

  static login(req, res, next) {
    let inputData = {
      email: req.body.email,
      password: req.body.password
    }
    User
      .findOne({
        where: {
          email: inputData.email
        }
      })
      .then((data) => {
        if (!data) throw { name: 'customError', msg: 'Invalid email or password' }
        let comparePass = comparePassword(inputData.password, data.password)
        if (!comparePass) throw { name: 'customError', msg: 'Invalid email or password' }
        let accessToken = createToken({
          id: data.id,
          email: data.email
        })
        res.status(200).json({ id: data.id, role: data.role, accessToken })
      })
      .catch((err) => {
        next(err)
      })
  }
}

module.exports = Controller