const request = require('supertest')
const app = require('../app')
const jwt = require('jsonwebtoken')
const { User, Product, sequelize } = require('../models/index')
let token = ''
let tokenCustomer = ''
let tokenInvalid = ''
let productId = 0

beforeAll((done) => {
  User
    .findOne({
      where: {
        email: 'ryan@mail.com'
      }
    })
    .then((data) => {
      token = jwt.sign({ id: data.id }, 'rahasia')
      return User.findOne({ where: { email: 'chita@mail.com' } })
    })
    .then((dataCustomer) => {
      tokenCustomer = jwt.sign({ id: dataCustomer.id }, 'rahasia')
      return Product.create({ name: 'test', img_url: 'google.com', price: 1, stock: 1 })
    })
    .then((dataProduct) => {
      productId = dataProduct.dataValues.id
      done()
    })
})

afterAll((done) => {
  Product
    .destroy({ where: {} })
    .then(() => {
      sequelize.close()
      done()
    })
    .catch((err) => {
      done(err)
    })
})

describe('DELETE /products/:id', () => {
  // SUCCESS TESTING
  it('should return status 200', (done) => {
    request(app)
      .delete(`/products/${productId}`)
      .set('token', token)
      .end((err, res) => {
        if (err) {
          done(err)
        }

        expect(res.status).toEqual(200)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        expect(res.body.message).toEqual('Product success deleted')
        done()
      })
  })

  // FAILED TESTING TOKEN CUSTOMER
  it('should return status 401, invalid customer', (done) => {
    request(app)
      .delete(`/products/${productId}`)
      .set('token', tokenCustomer)
      .end((err, res) => {
        if (err) {
          done(err)
        }

        expect(res.status).toEqual(401)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        expect(res.body.message).toEqual('Not Authorized')

        done()
      })
  })

  // FAILED TESTING TOKEN INVALID
  it('should return status 401, invalid token', (done) => {
    request(app)
      .delete(`/products/${productId}`)
      .set('token', tokenInvalid)
      .end((err, res) => {
        if (err) {
          done(err)
        }

        expect(res.status).toEqual(401)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        expect(res.body.message).toEqual('Invalid token')

        done()
      })
  })
})