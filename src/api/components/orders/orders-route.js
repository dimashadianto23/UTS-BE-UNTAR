const express = require('express');
const ordersController = require('./orders-controller');
const ordersValidator = require('./orders-validator');
const authenticationMiddleware = require('../../middlewares/authentication-middleware');
const celebrate = require('../../../core/celebrate-wrappers');

const route = express.Router();

module.exports = (app) => {
  app.use('/orders', route);

  // Create order
  route.post('/', authenticationMiddleware, celebrate(ordersValidator.createOrder), ordersController.createOrder);

  // Get all order
  route.get('/', authenticationMiddleware, ordersController.getOrders);

   // Get order by ID
  route.get('/:id', authenticationMiddleware, ordersController.getOrder);

  // Update order by ID
  route.put('/:id', authenticationMiddleware, celebrate(ordersValidator.updateOrder), ordersController.updateOrder);
};