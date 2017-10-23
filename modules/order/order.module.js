const express                           = require('express');
const router                            = express.Router();
const orderController            = require('./order.controller');

router.route('/').get(orderController.getAll);
router.route('/').post(orderController.addOne);
router.route('/').delete(orderController.removeAll);
router.route('/:objectId').get(orderController.getOne);
router.route('/:objectId').put(orderController.updateOne);
router.route('/:objectId').delete(orderController.removeOne);

module.exports = router;
