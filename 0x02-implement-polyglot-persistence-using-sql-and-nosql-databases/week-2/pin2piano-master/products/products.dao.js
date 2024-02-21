const { v4: uuidv4 } = require("uuid");
const Products = require("./products.entity");
/* 
  saveProduct should be a function that calls the save() function on Products Model 
  to persist products data in MongoDB Products collection of shoppingcartDB
*/
const saveProduct = (productReq, done) => {
  const product = new Products(productReq);
  product.productId = uuidv4();
  product.save((err, savedProduct) => {
    if (err) {
      return done(err);
    }
    return done(null, savedProduct);
  });
};

/* 
  getProductById should be a function that calls the findOne() function on Products Model 
  to fetch the Product document by provided Id from the Products collection of shoppingcartDB
*/
const getProductById = (productId, done) => {
  Products.findOne({ productId: productId }).lean().exec((err, product) => {
    if (err) {
      return done(err);
    }
    return done(null, product);
  });
};

/* 
  findProductsByQuery should be a function that calls the find() function on Products Model 
  with query specifying criteria on category and productName fields
  The function should fetch all documents that matches the criteria from Products 
  collection of shoppingcartDB
*/
const findProductsByQuery = (query, done) => {
  Products.find(query).lean().exec((err, products) => {
    if (err) {
      return done(err);
    }
    return done(null, products);
  });
};

/* 
  updateProductDetails should be a function that calls the findOneAndUpdate() 
  function on Products Model that fetches product by id from Products collection of shoppingcartDB and updates it
*/
const updateProductDetails = (productId, updatedProduct, done) => {
  Products.findOneAndUpdate({ productId: productId }, updatedProduct, { new: true }, (err, product) => {
    if (err) {
      return done(err);
    }
    return done(null, product);
  });
}


module.exports = {
  saveProduct,
  getProductById,
  findProductsByQuery,
  updateProductDetails
}