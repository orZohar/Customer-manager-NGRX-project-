var express = require('express');
const customersController = require('../controllers/customers');
var customersRouter = express.Router();

customersRouter.get('', customersController.customers_getAll);
customersRouter.post('', customersController.customers_add);
customersRouter.delete('/:id', customersController.customers_delete);
customersRouter.put('/:id', customersController.customers_update);

module.exports = customersRouter;