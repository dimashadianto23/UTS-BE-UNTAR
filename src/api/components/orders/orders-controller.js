const orderService = require('./orders-service');

/**
 * Create order
 * @param {Object} request - HTTP request
 * @param {Object} response - HTTP response
 * @param {Object} next - Express route middlewares
 * @returns {Object} - Response object or pass an error to the next route
 */
async function createOrder(request, response, next) {
  try {
    const { customerName, product, quantity } = request.body;
    const createdAt = new Date();

    const order = await orderService.createOrder(customerName, product, quantity, createdAt);
    
    if (!order) {
      return response.status(400).json({ message: 'Failed to place order. Product may not exist or insufficient quantity' });
    }

    response.status(201).json({ message: 'Order placed successfully', createdAt, product, quantity });
  } catch (error) {
    next(error);
  }
}

/**
 * Get order detail
 * @param {Object} request - HTTP request
 * @param {Object} response - HTTP response
 * @param {Object} next - Express route middlewares
 * @returns {Object} - Response object or pass an error to the next route
 */
async function getOrders(request, response, next) {
  try {
    const orders = await orderService.getOrders();
    response.status(200).json(orders);
  } catch (error) {
    next(error);
  }
}

/**
 * Get order
 * @param {Object} request - HTTP request
 * @param {Object} response - HTTP response
 * @param {Object} next - Express route middlewares
 * @returns {Object} - Response object or pass an error to the next route
 */
async function getOrder(request, response, next) {
  try {
    const order = await orderService.getOrder(request.params.id);

    if (!order) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Unknown order');
    }

    return response.status(200).json(order);
  } catch (error) {
    return next(error);
  }
}

/**
 * Update order
 * @param {Object} request - HTTP request
 * @param {Object} response - HTTP response
 * @param {Object} next - Express route middlewares
 * @returns {Object} - Response object or pass an error to the next route
 */
async function updateOrder(request, response, next) {
  try {
    const id = request.params.id;
    const customerName = request.body.customerName;
    const product = request.body.product;
    const quantity = request.body.quantity;

    const success = await orderService.updateOrder(id, customerName, product, quantity);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to update order'
      );
    }

    return response.status(200).json({ id });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
};