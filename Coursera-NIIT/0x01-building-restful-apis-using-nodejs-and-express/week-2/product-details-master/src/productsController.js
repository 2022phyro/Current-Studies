const sv = require('./productsService')

const getProducts = (done) => {
   //call service getproducts method and pass the parameter
   return sv.getProducts(done)

}

const getProductById = (productId, done) => {
   //call service getProductById method and pass the parameter
  return sv.getProductById(productId, done)
}

const saveProductDetails = (productDetails, done) => {
  //call service saveProductDetails method and pass the parameter
  return sv.saveProductDetails(productDetails, done)
}


 const deleteProductById = (productId, done) => {
   //call service deleteProductById method and pass the parameter
  return sv.deleteProductById(productId, done)
 }

module.exports = {
  getProducts, getProductById, saveProductDetails, deleteProductById
}
