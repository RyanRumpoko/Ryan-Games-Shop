const express = require('express')
const router = express.Router()
const Controller = require('../controllers/customerController')
const { authenticate, authCustomer } = require('../middlewares/authenticate')

router.use(authenticate)
router.post('/:productid', authCustomer, Controller.postCustomerProduct)
router.get('/', authCustomer, Controller.getCustomerProduct)
router.get('/history', authCustomer, Controller.getCustomerHistory)
router.get('/:productid', authCustomer, Controller.getProductById)
router.patch('/:id', authCustomer, Controller.patchCustomerProduct)
router.delete('/:id', authCustomer, Controller.deleteCustomerProduct)

module.exports = router