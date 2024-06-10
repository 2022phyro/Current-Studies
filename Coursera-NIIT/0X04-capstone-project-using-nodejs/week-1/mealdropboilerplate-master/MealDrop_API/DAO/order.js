// Import the order model
const Order = require('../model/order');

// Get order by id
async function getOrderById(id) {
  try {
    const order = await Order.findById(id);
    return order;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Get all orders
async function getAllOrders() {
  try {
    const orders = await Order.find();
    return orders;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Create a new order
async function createOrder(orderData) {
  try {
    const order = new Order(orderData);
    const createdOrder = await order.save();
    return createdOrder;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
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

// Delete an order by filters
async function deleteOrderByFilters(filters) {
  try {
    const deletedOrder = await Order.deleteOne(filters);
    return deletedOrder;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Get all orders by filters
async function getAllOrdersByFilters(filters) {
  try {
    const orders = await Order.find(filters);
    return orders;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = {
  getOrderById,
  getAllOrders,
  createOrder,
  deleteOrderByFilters,
  getAllOrdersByFilters,
};
