const orderRepository = require('./orders-repository');
const productRepository = require('../products/products-repository');

/**
 * Create a new order
 * @param {string} customerName - Customer's name
 * @param {string} product - Product id
 * @param {number} quantity - Quantity order
 * @returns {Promise}
 */
async function createOrder(customerName, product, quantity) {
  const existingProduct = await productRepository.getProduct(product);

  if (!existingProduct) {
    return null;
  }

  if (existingProduct.quantity < quantity) {
    return null;
  }

  existingProduct.quantity -= quantity;

  await existingProduct.save();

  return orderRepository.createOrder(customerName, product, quantity);
}

/**
 * Get a list of orders
 * @returns {Array}
 */
async function getOrders() {
  return orderRepository.getOrders();
}

/**
 * Get order detail
 * @param {string} id - Order ID
 * @returns {Object}
 */
async function getOrder(id) {
  return orderRepository.getOrder(id);
}

/**
 * Update an existing order
 * @param {string} id - Order ID
 * @param {string} customerName - Customer's name
 * @param {string} product - Product Id
 * @param {number} quantity - Quantity order
 * @returns {boolean}
 */
async function updateOrder(id, customerName, product, quantity) {
  const order = await orderRepository.getOrder(id);
  if (!order) {
    return null;
  }

  try {
    await orderRepository.updateOrder(id, customerName, product, quantity);
  } catch (error) {
    return null;
  }

  return true;
}

module.exports = {
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
};
