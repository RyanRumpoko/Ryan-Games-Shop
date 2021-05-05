const express = require('express')
const router = express.Router()
const user = require('./userRouter')
const product = require('./productRouter')
const customer = require('./customerRouter')

router.use('/', user)
router.use('/products', product)
router.use('/customers', customer)

module.exports = router