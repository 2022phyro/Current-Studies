

//import the DAO layer
const db = require('./productDao')

const getProducts = function(done){
  //call dao getproducts method and pass the parameter
  return db.getProducts(done)
}

const getProductById = function(id, done){
  //call dao getProductById method and pass the parameter
  return db.getProductById(id, done)
 
}
const saveProductDetails = function(productDetails, done){
  //call dao saveProductDetails method and pass the parameter
  return db.saveProductDetails(productDetails, done)

}


const deleteProductById = (productId, done) => {
//call dao deleteProductById method and pass the parameter
  return db.deleteProductById(productId, done)
}



module.exports = {
  getProducts, getProductById,saveProductDetails, deleteProductById
}
