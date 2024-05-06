const joi = require('joi');

module.exports = {
  createProduct: {
    body: {
      name: joi.string().min(1).max(100).required().label('Name'),
      description: joi.string().required().label('Description'),
      price: joi.number().greater(0).required().label('Price'),
      category: joi.string().required().label('Category'),
      quantity: joi.number().integer().min(0).required().label('Quantity'),
    },
  },

  updateProduct: {
    body: {
      name: joi.string().min(1).max(100).label('Name'),
      description: joi.string().label('Description'),
      price: joi.number().greater(0).label('Price'),
      category: joi.string().label('Category'),
      quantity: joi.number().integer().min(0).required().label('Quantity'),
    },
  },
};