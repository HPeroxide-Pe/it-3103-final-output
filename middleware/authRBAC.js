const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });
const jwt = require('jsonwebtoken');

//JWT Authentication middleware 
const authMiddleware = (req, res, next) => {
  const header = req.headers["authorization"];

  if(!header) {
    return res.status(401).send("Unauthorized");
  }

  try{
    const token = header && header.split(" ")[1]; 
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch(error) {
    return res.status(401).send({error: 'Invalid Token'})
  }
};

//Verify the role of the user after JWT authentication
const verifyRBAC = (allowedRoles) =>{
  return (req, res, next) => {
    console.log(req.user);
    const test = req.user;
    if(!allowedRoles.includes(test.role)){
      return res.status(401).send("Unauthorized");
    }
    next();
  }
}

module.exports = {authMiddleware, verifyRBAC};