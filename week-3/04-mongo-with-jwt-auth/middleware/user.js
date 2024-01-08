const jwt = require('jsonwebtoken');
const { User } = require('../db');

async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const {authorization} = req.headers;

    if(!authorization){
        return res.status(400).json({"message": "Invalid authorization"});
    }

    const token = authorization.slice(7);
    let decoded = null;
    try {
         decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return res.status(400).json({"message": "Invalid authorization"});
    }

    const user = await User.findOne({username: decoded.username});

    if(!user){
        return res.status(400).json({"message": "Invalid authorization"});
    }
    req.body.username = decoded.username;
    next();
}

module.exports = userMiddleware;