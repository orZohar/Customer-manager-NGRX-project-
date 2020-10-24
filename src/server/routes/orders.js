var express = require('express');
const ordersController = require('../controllers/orders');
var ordersRouter = express.Router();

ordersRouter.get('', ordersController.orders_getAll);
ordersRouter.post('', ordersController.orders_add);
// customersRouter.delete('/:id', customersController.customers_delete);
// customersRouter.put('/:id', ordersController.customers_update);

module.exports = ordersRouter;