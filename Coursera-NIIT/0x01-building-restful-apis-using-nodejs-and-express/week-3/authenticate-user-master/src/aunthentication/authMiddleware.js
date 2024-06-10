const config = require('../../config')
const jwt = require('jsonwebtoken')

//import jsonwebtoken and config

//This function verifyToken will verify the token coming from headers 
const verifyToken = (req, res, next) => {
  // Getting the authorization header
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).send({error: "A token is required for authorization"})
  }
  try {
    req.claims = jwt.verify(token, config.AUTH_SECRET)
  } catch (err) {
    return res.status(401).send({error: "Invalid token"})
  }
  return next();
};

module.exports = verifyToken;