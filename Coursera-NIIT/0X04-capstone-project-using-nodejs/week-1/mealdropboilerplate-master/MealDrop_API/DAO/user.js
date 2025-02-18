const User = require('../model/user');

/**
 * Create a new user
 * @param {Object} user - User object
 * @returns {Object} - User object
 */
async function createUser (user) {
    const newUser = new User(user);
    try {
        const saved = await newUser.save();
        console.log("Successfully saved new user with id", saved._id)
        return saved;
    } catch (error) {
        console.error('Error in createUser', error);
        if (error.code == 11000) {
            throw new Error("User already exists");
        }
    }
};
/**
 * Get a user by id
 * @param {String} userId - User id
 * @param {Object} filters - Filters to apply
 * @returns {Object} - User object
 */
async function getUser (userId, filters) {
    try {
        if (userId) {
            const user = await User.findById(userId, filters).lean().exec();
            return user;
        } else {
            const userList = await User.find(filters).lean().exec();
            if (userList.length == 0) {
                return null;
            }
            const user = userList[0];
            return user
        }
    } catch (error) {
        console.error('Error in getUser', error);
        throw new Error("Error in getting user");
    }
};
/**
 * Update a user
 * @param {String} userId - User id
 * @param {Object} user - User object
 * @returns {Object} - User object
 */
async function updateUser (userId, user) {
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, user).lean().exec();
        return updatedUser;
    } catch (error) {
        console.error('Error in updateUser', error);
        throw new Error("Error in updating user");
    }
};
/**
 * Delete a user
 * @param {String} userId - User id
 * @returns {Object} - User object
 */
async function deleteUser (userId) {
    try {
        const deletedUser = await User.findByIdAndDelete(userId).lean().exec();
        return deletedUser;
    } catch (error) {
        console.error('Error in deleteUser', error);
        throw new Error("Error in deleting user");
    }
};
/**
 * Get all users
 * @param {Object} filters - Filters to apply
 * @returns {Array} - Array of user objects
 */
async function getAllUsers (filters) {
    try {
        if (!filters) {
            filters = {};
        }
        const users = await User.find(filters).lean().exec();
        return users;
    } catch (error) {
        console.error('Error in getAllUsers', error);
        throw new Error("Error in getting all users");
    }
};


module.exports = {
    createUser,
    getUser,
    updateUser,
    deleteUser,
    getAllUsers
};