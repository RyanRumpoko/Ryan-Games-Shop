const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models/index')

afterAll((done) => {
  sequelize.close()
  done()
})

describe('POST /login', () => {
  // SUCCESS TESTING
  it('should return status 200', (done) => {
    let data = {
      email: 'ryan@mail.com',
      password: 'ryan123'
    }

    request(app)
      .post('/login')
      .send(data)
      .end((err, res) => {
        if (err) {
          done(err)
        }

        expect(res.status).toEqual(200)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('accessToken')
        done()
      })
  })

  // FAILED TESTING PASSWORD WRONG
  it('should return status 400, wrong password', (done) => {
    let data = {
      email: 'ryan@mail.com',
      password: 'ryan'
    }

    request(app)
      .post('/login')
      .send(data)
      .end((err, res) => {
        if (err) {
          done(err)
        }

        expect(res.status).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        expect(res.body.message).toEqual('Invalid email or password')
        done()
      })
  })

  // FAILED TESTING EMAIL WRONG
  it('should return status 400, wrong email', (done) => {
    let data = {
      email: 'ryan123@mail.com',
      password: 'ryan123'
    }

    request(app)
      .post('/login')
      .send(data)
      .end((err, res) => {
        if (err) {
          done(err)
        }

        expect(res.status).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        expect(res.body.message).toEqual('Invalid email or password')
        done()
      })
  })

  // FAILED TESTING EMAIL & PASSWORD EMPTY
  it('should return status 400, email & password empty', (done) => {
    let data = {
      email: '',
      password: ''
    }

    request(app)
      .post('/login')
      .send(data)
      .end((err, res) => {
        if (err) {
          done(err)
        }

        expect(res.status).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        expect(res.body.message).toEqual('Invalid email or password')
        done()
      })
  })
})