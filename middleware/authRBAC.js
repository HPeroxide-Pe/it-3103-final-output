const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });
const jwt = require('jsonwebtoken');
const logger = require('../logger');
require('winston');
//JWT Authentication middleware 
const authMiddleware = (req, res, next) => {
  const header = req.headers["authorization"];

  if(!header) {
    logger.error("No/Invalid Token")
    return res.status(401).send("No/Invalid Token");
  }

  try{
    const token = header && header.split(" ")[1]; 
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    logger.info('User Authenticated');
    next();
  } catch(error) {
    logger.error('Invalid Token');
    return res.status(401).send({error: 'Invalid Token'})
  }
};

//Verify the role of the user after JWT authentication
const verifyRBAC = (allowedRoles) =>{
  return (req, res, next) => {
    const test = req.user;
    if(!allowedRoles.includes(test.role)){
      logger.error("Unauthorized");
      return res.status(401).send("Unauthorized");
    }
    logger.info("Name:" + test.name + ", Role: " + test.role);
    next();
  }
}

const routeLog = (Message) =>{
  return (req, res, next) =>{
    logger.info(Message);
    next();
  }  
}

module.exports = {authMiddleware, verifyRBAC, routeLog};