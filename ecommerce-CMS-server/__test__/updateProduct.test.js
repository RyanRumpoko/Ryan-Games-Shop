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

describe('PUT /products/:id', () => {
  // SUCCESS TESTING
  it('should return status 200', (done) => {
    let data = {
      name: 'test 1',
      img_url: 'yahoo.com',
      price: 2,
      stock: 2
    }

    request(app)
      .put(`/products/${productId}`)
      .send(data)
      .set('token', token)
      .end((err, res) => {
        if (err) {
          done(err)
        }

        expect(res.status).toEqual(200)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('id')
        expect(res.body).toHaveProperty('name')
        expect(res.body).toHaveProperty('img_url')
        expect(res.body).toHaveProperty('price')
        expect(res.body).toHaveProperty('stock')
        expect(res.body).toHaveProperty('createdAt')
        expect(res.body).toHaveProperty('updatedAt')

        expect(typeof res.body.id).toBe('number')
        expect(typeof res.body.name).toBe('string')
        expect(res.body.name).toEqual(data.name)
        expect(typeof res.body.img_url).toBe('string')
        expect(res.body.img_url).toEqual(data.img_url)
        expect(typeof res.body.price).toBe('number')
        expect(res.body.price).toEqual(data.price)
        expect(typeof res.body.stock).toBe('number')
        expect(res.body.stock).toEqual(data.stock)

        done()
      })
  })

  // FAILED TESTING TOKEN INVALID
  it('should return status 401, invalid token', (done) => {
    let data = {
      name: 'test 1',
      img_url: 'yahoo.com',
      price: 2,
      stock: 2
    }

    request(app)
      .put(`/products/${productId}`)
      .send(data)
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

  // FAILED TESTING TOKEN CUSTOMER
  it('should return status 401, customer token', (done) => {
    let data = {
      name: 'test 1',
      img_url: 'yahoo.com',
      price: 2,
      stock: 2
    }

    request(app)
      .put(`/products/${productId}`)
      .send(data)
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

  // FAILED TESTING PRICE < 0
  it('should return status 400, price < 0', (done) => {
    let data = {
      name: 'test 1',
      img_url: 'yahoo.com',
      price: -2,
      stock: 2
    }

    request(app)
      .put(`/products/${productId}`)
      .send(data)
      .set('token', token)
      .end((err, res) => {
        if (err) {
          done(err)
        }

        expect(res.status).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors[0]).toEqual('Price must be greater than zero')

        done()
      })
  })

  // FAILED TESTING STOCK < 0
  it('should return status 400, stock < 0', (done) => {
    let data = {
      name: 'test 1',
      img_url: 'yahoo.com',
      price: 2,
      stock: -2
    }

    request(app)
      .put(`/products/${productId}`)
      .send(data)
      .set('token', token)
      .end((err, res) => {
        if (err) {
          done(err)
        }

        expect(res.status).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors[0]).toEqual('Stock must be greater than zero')

        done()
      })
  })

  // FAILED TESTING PRICE STRING
  it('should return status 400, price with string', (done) => {
    let data = {
      name: 'test 1',
      img_url: 'yahoo.com',
      price: 'Dua',
      stock: 2
    }

    request(app)
      .put(`/products/${productId}`)
      .send(data)
      .set('token', token)
      .end((err, res) => {
        if (err) {
          done(err)
        }

        expect(res.status).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors[0]).toEqual('Price must be number')

        done()
      })
  })
})