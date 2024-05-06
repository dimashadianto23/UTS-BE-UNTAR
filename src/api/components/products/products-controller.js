const productService = require('./products-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

/**
 * Get list of products
 * @param {Object} request - HTTP request
 * @param {Object} response - HTTP response
 * @param {Object} next - Express route middlewares
 * @returns {Object} - Response object or pass an error to the next route
 */
async function getProducts(request, response, next) {
  try {
    const products = await productService.getProducts();
    return response.status(200).json(products);
  } catch (error) {
    return next(error);
  }
}

/**
 * Get product detail
 * @param {Object} request - HTTP request
 * @param {Object} response - HTTP response
 * @param {Object} next - Express route middlewares
 * @returns {Object} - Response object or pass an error to the next route
 */
async function getProduct(request, response, next) {
  try {
    const product = await productService.getProduct(request.params.id);

    if (!product) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Unknown product');
    }

    return response.status(200).json(product);
  } catch (error) {
    return next(error);
  }
}

/**
 * Create product
 * @param {Object} request - HTTP request
 * @param {Object} response - HTTP response
 * @param {Object} next - Express route middlewares
 * @returns {Object} - Response object or pass an error to the next route
 */
async function createProduct(request, response, next) {
  try {
    const name = request.body.name;
    const description = request.body.description;
    const price = request.body.price;
    const category = request.body.category;
    const quantity = request.body.quantity;

    const success = await productService.createProduct(name, description, price, category, quantity);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to create product'
      );
    }

    return response.status(200).json({ name, description, price, category, quantity });
  } catch (error) {
    return next(error);
  }
}

/**
 * Update product
 * @param {Object} request - HTTP request
 * @param {Object} response - HTTP response
 * @param {Object} next - Express route middlewares
 * @returns {Object} - Response object or pass an error to the next route
 */
async function updateProduct(request, response, next) {
  try {
    const id = request.params.id;
    const name = request.body.name;
    const description = request.body.description;
    const price = request.body.price;
    const category = request.body.category;
    const quantity = request.body.quantity;

    const success = await productService.updateProduct(id, name, description, price, category, quantity);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to update product'
      );
    }

    return response.status(200).json({ id });
  } catch (error) {
    return next(error);
  }
}

/**
 * Delete product
 * @param {Object} request - HTTP request
 * @param {Object} response - HTTP response
 * @param {Object} next - Express route middlewares
 * @returns {Object} - Response object or pass an error to the next route
 */
async function deleteProduct(request, response, next) {
  try {
    const id = request.params.id;

    const success = await productService.deleteProduct(id);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to delete product'
      );
    }

    return response.status(200).json({ id });
  } catch (error) {
    return next(error);
  }
}

/**
 * Delete product
 * @param {Object} request - HTTP request
 * @param {Object} response - HTTP response
 * @param {Object} next - Express route middlewares
 * @returns {Object} - Response object or pass an error to the next route
 */
async function orderProduct(request, response, next) {
  try {
    const productId = request.body.productId;
    const quantityToOrder = request.body.quantity;

    const success = await productService.orderProduct(productId, quantityToOrder);
    if (!success) {
      throw new Error('Failed to order product');
    }

    return response.status(200).json({ success: true });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  orderProduct,
};