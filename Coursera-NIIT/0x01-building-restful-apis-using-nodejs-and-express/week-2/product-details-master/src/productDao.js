
//import fs module
const fs = require('fs')
const store = './src/products.json'

//The getProducts function take done as callback
//It will read the product.json file

const getProducts = function(done){
    fs.readFile(store, 'utf-8', (err, data) => {
      if (err) {
        return done(err)
      } else {
        return done(null, JSON.parse(data))
      }
    })      
}


//The function getProductById will take two parameters first the id and second the callback
//It will read the product.json file
const getProductById = function(id,done){
  fs.readFile(store, 'utf-8', (err, data) => {
    if (err) {
      return done("An unexpected error occurs")
    } else {
      const products = JSON.parse(data);
      const prod = products.find((pro) => pro.id == id)
      if (!prod) {
        return done("This product does not exist")
      }
      return done(null, prod)
    }
  }) 
}


//The saveProductDetails method will take productDetails and done as callback
//It will read the product.json file
const saveProductDetails = function (ProductDetails, done) {
  fs.readFile(store, 'utf-8', (err, data) => {
    if (err) {
      return done("An unexpected error occurs")
    } else {
      const products = JSON.parse(data);
      products.push(ProductDetails);
      const toFile = JSON.stringify(products);
      fs.writeFile(store, toFile, 'utf-8', (err) => {
        if (err) {
          return done(err.message)
        }
        else {
          return done(null,  ProductDetails)
        }
      })
    }
  }) 
  //write all the logical steps
  //parse the filecontent and save it in another varible say productdata
  //push the productDetails in the productData
      
  //Write the productData into the file 
     
  //return the callback with undefined and ProductDetails
     
    
  }

  //The method deleteProductById will take productId and done as parameters
  //It will read the product.json file

  const deleteProductById = function(productId, done){
    fs.readFile(store, 'utf-8', (err, data) => {
      if (err) {
        return done("An unexpected error occurs")
      } else {
        const products = JSON.parse(data);
        const prod = products.find((pro) => pro.id == productId)
        const datas = prod
        if (!prod) {
          return done("This product does not exist")
        }
        const index = products.indexOf(prod)
        products.splice(index, 1)
        const toFile = JSON.stringify(products);
        fs.writeFile(store, toFile, 'utf-8', (err) => {
        if (err) {
          return done(err.message)
        }
        else {
          return done(null, datas)
        }
      })
      }
    }) 
    //Write all the logical steps
     //return the callback with first parameter as undefined and second parameter as productDetails
  }


module.exports ={
    getProducts,
    getProductById,
    saveProductDetails,
    deleteProductById
    
}