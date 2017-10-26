const express                           = require('express');
const router                            = express.Router();
const productController            = require('./product.controller');

router.route('/').get(productController.getAll);
router.route('/').delete(productController.removeAll);
router.route('/').post(productController.addOne);
router.route('/:objectId').get(productController.getOne);
router.route('/:objectId').put(productController.updateOne);
router.route('/:objectId').delete(productController.removeOne);

module.exports = router;
