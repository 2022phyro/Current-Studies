// Import the necessary dependencies
const lodash = require("lodash");
const productsList = require("./products.json").products;


const getProducts = () => {
  return JSON.stringify(productsList);
}

const getProductsById = (productId, done) => {
  let product = null
  product = lodash.find(productsList, (prod) => prod.id == productId);
  if (product) {
    return done(null, JSON.stringify(product));
  }  else {
    return done("Requested product doesn't exist..!")
  }
}

const saveProduct = (newProduct, done) => {
  if (lodash.find(productsList, (prod) => prod.id == newProduct.id)) {
    return done("Product already exists..!")
  } else {
      productsList.push(newProduct);
      return done(null, JSON.stringify(productsList));
  }

}

const updateProduct = (productId, updateData, done) => {
  let updatedProductList = null;
  let product = lodash.find(productsList, (prod) => prod.id == productId);
  if (product) {
    Object.assign(product, updateData)
    updatedProductList = productsList;
    return done(null, JSON.stringify(updatedProductList));
  } else {
    return done("Requested product doesn't exist..!")
  }

}

const deleteProduct = (productId, done) => {
  let product = lodash.find(productsList, (prod) => prod.id == productId);
  if (product) {
    let index = productsList.indexOf(product);
    productsList.splice(index, 1)
    return done(null, JSON.stringify(productsList));
  } else {
    return done("Requested product doesn't exist..!")
  }
}


module.exports = {
  getProducts,
  getProductsById,
  saveProduct,
  updateProduct,
  deleteProduct
}