const { User } = require('../../../models');

/**
 * Get a list of users with search and sorting
 * @param {object} searchQuery - Query object for search
 * @param {string} sortBy - Field to sort by
 * @param {number} sortOrder - Sort order (-1 for descending, 1 for ascending)
 * @param {number} skip - Number of documents to skip
 * @param {number} limit - Maximum number of documents to return
 * @returns {Promise}
 */
async function getUsersWithSearchAndSort(searchQuery, sortBy, sortOrder, skip, limit) {
  return User.find(searchQuery)
    .sort({ [sortBy]: sortOrder })
    .skip(skip)
    .limit(limit);
}

/**
 * Get total count of users with search
 * @param {object} searchQuery - Query object for search
 * @returns {Promise}
 */
async function getTotalUsersCountWithSearch(searchQuery) {
  return User.countDocuments(searchQuery);
}

/**
 * Get user detail
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function getUser(id) {
  return User.findById(id);
}

/**
 * Create new user
 * @param {string} name - Name
 * @param {string} email - Email
 * @param {string} password - Hashed password
 * @returns {Promise}
 */
async function createUser(name, email, password) {
  return User.create({
    name,
    email,
    password,
  });
}

/**
 * Update existing user
 * @param {string} id - User ID
 * @param {string} name - Name
 * @param {string} email - Email
 * @returns {Promise}
 */
async function updateUser(id, name, email) {
  return User.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        name,
        email,
      },
    }
  );
}

/**
 * Delete a user
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function deleteUser(id) {
  return User.deleteOne({ _id: id });
}

/**
 * Get user by email to prevent duplicate email
 * @param {string} email - Email
 * @returns {Promise}
 */
async function getUserByEmail(email) {
  return User.findOne({ email });
}

/**
 * Update user password
 * @param {string} id - User ID
 * @param {string} password - New hashed password
 * @returns {Promise}
 */
async function changePassword(id, password) {
  return User.updateOne({ _id: id }, { $set: { password } });
}

module.exports = {
  getUsersWithSearchAndSort,
  getTotalUsersCountWithSearch,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
  changePassword,
};
