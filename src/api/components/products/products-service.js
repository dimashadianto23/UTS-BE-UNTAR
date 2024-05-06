const productRepository = require('./products-repository');

/**
 * Get a list of products
 * @returns {Array}
 */
async function getProducts() {
  return productRepository.getProducts();
}

/**
 * Get product detail
 * @param {string} id - Product ID
 * @returns {Object}
 */
async function getProduct(id) {
  return productRepository.getProduct(id);
}

/**
 * Create a new product
 * @param {string} name - Product name
 * @param {string} description - Product description
 * @param {number} price - Product price
 * @param {string} category - Product category
 * @param {number} quantity - Product quantity
 * @returns {boolean}
 */
async function createProduct(name, description, price, category, quantity) {
  try {
    await productRepository.createProduct(name, description, price, category, quantity);
  } catch (error) {
    return null;
  }

  return true;
}

/**
 * Update an existing product
 * @param {string} id - Product ID
 * @param {string} name - Product name
 * @param {string} description - Product description
 * @param {number} price - Product price
 * @param {string} category - Product category
 * @param {number} quantity - Product quantity
 * @returns {boolean}
 */
async function updateProduct(id, name, description, price, category, quantity) {
  const product = await productRepository.getProduct(id);
  if (!product) {
    return null;
  }

  try {
    await productRepository.updateProduct(id, name, description, price, category, quantity);
  } catch (error) {
    return null;
  }
  
  return true;
}

/**
 * Delete a product
 * @param {string} id - Product ID
 * @returns {boolean}
 */
async function deleteProduct(id) {
  const product = await productRepository.getProduct(id);
  if (!product) {
    return null;
  }

  try {
    await productRepository.deleteProduct(id);
  } catch (error) {
    return null;
  }

  return true;
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};