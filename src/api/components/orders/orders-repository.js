const { Order } = require('../../../models');

/**
 * Create a new order
 * @param {string} customerName - Customer's name
 * @param {string} product - Product Id
 * @param {number} quantity - Quantity order
 * @param {Date} createdAt - Date and time when the order is created
 * @returns {Promise}
 */
async function createOrder(customerName, product, quantity, createdAt) {
  return Order.create({ customerName, product, quantity, createdAt });
}

/**
 * Get a list of orders
 * @returns {Promise}
 */
async function getOrders() {
  return Order.find({});
}

/**
 * Get order detail
 * @param {string} id - Order ID
 * @returns {Promise}
 */
async function getOrder(id) {
  return Order.findById(id);
}

/**
 * Update existing order
 * @param {string} id - Order ID
 * @param {string} customerName - Customer's name
 * @param {string} product - Product Id
 * @param {number} quantity - Quantity order
 * @returns {Promise}
 */
async function updateOrder(id, customerName, product, quantity) {
  return Order.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        customerName,
        product,
        quantity
      },
    }
  );
}

module.exports = {
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
};