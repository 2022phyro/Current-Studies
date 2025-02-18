const express = require('express');
const { getProducts, addProduct, deleteProduct } = require('../controllers/product')

const router = express.Router();

// Write the code to specify the route of getProduct, addProduct and deleteProduct method

router.get('/:userId', getProducts);
router.post('/:userId', addProduct);
router.delete('/:userId', deleteProduct);

module.exports = router