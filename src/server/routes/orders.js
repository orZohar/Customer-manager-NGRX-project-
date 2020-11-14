var express = require('express');
const ordersController = require('../controllers/orders');
var ordersRouter = express.Router();

ordersRouter.get('', ordersController.orders_getAll);
ordersRouter.post('', ordersController.orders_add);
ordersRouter.delete('/:id', ordersController.orders_delete);
// customersRouter.put('/:id', ordersController.customers_update);

module.exports = ordersRouter;