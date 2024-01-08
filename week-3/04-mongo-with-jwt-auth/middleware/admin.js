const jwt = require('jsonwebtoken');
const { Admin } = require('../db');
// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const {authorization} = req.headers;
    //console.log(authorization);
    if(!authorization){
        return res.status(400).json({"message": "Invalid authorization"});
    }

    const token = authorization.slice(7);
    //console.log(token);
    let decoded = null;
    try {
         decoded = jwt.verify(token, process.env.JWT_SECRET);
         //console.log(decoded);
    } catch (error) {
        return res.status(400).json({"message": "Invalid authorization", "error": error.message});
    }

    const admin = await Admin.findOne({username: decoded.username});

    if(!admin){
        return res.status(400).json({"message": "Invalid authorization"});
    }
    req.body.username = decoded.username;
    next();
}

module.exports = adminMiddleware;