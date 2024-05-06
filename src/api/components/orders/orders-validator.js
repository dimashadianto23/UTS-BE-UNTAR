const Joi = require('joi');

module.exports = {
  createOrder: {
    body: {
      customerName: Joi.string().required(),
      product: Joi.string().required(),
      quantity: Joi.number().integer().min(1).required()
    }
  },
  
  updateOrder: {
    body: {
      customerName: Joi.string().required(),
      product: Joi.string().required(),
      quantity: Joi.number().integer().min(1).required()
    }
  }
};