const { v4: uuidv4 } = require("uuid");
const Orders = require("./orders.entity");
/* 
  saveOrder should be a function that calls the save() function on Orders Model 
  to persist order data in MongoDB Orders collection of shoppingcartDB
*/
const saveOrder = (orderReq, done) => {
  orderReq.orderId = uuidv4();
  const order = new Orders(orderReq);
  order.save((err, savedOrder) => {
    if (err) {
      return done(err);
    }
    return done(null, savedOrder);
  });
};


/* 
  findOrdersPlacedByUser should be a function that calls the find() function on Orders Model 
  to fetch all documents from Orders collection of shoppingcartDB,
  containing data of Orders for a given UserId
*/
const findOrdersPlacedByUser = (userId, done) => {
  Orders.find({ userId: userId }).lean().exec((err, results) => {
    if (err) {
      return done(err);
    }
    return done(null, results);
  });
}


module.exports = {
  saveOrder,
  findOrdersPlacedByUser
}