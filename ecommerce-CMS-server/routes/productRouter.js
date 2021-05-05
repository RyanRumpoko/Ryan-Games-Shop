const express = require('express')
const router = express.Router()
const Controller = require('../controllers/productController')
const { authenticate, authorize } = require('../middlewares/authenticate')

router.use(authenticate)
router.get('/', Controller.getProduct)
router.post('/', authorize, Controller.postProduct)
router.get('/:id', authorize, Controller.getProductById)
router.put('/:id', authorize, Controller.putProduct)
router.delete('/:id', authorize, Controller.deleteProduct)

module.exports = router