const { Admin } = require("../db");

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const {username, password} = req.headers;
    
    if(!username || !password) {
        res.status(400).json({"message": "Invalid username or password"});
    }
    const existingUser = await Admin.findOne({username});

    if(!existingUser){
        res.status(400).json({"message": "User not found"});
    }

    if(existingUser.password!==password){
        res.status(400).json({"message": "Password is incorrect"});
    }

    next();
}

module.exports = adminMiddleware;