const { User } = require("../db");

async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const {username, password} = req.headers;
    
    if(!username || !password) {
        res.status(400).json({"message": "Invalid username or password"});
    }
    const existingUser = await User.findOne({username});

    if(!existingUser){
        res.status(400).json({"message": "User not found"});
    }

    if(existingUser.password!==password){
        res.status(400).json({"message": "Password is incorrect"});
    }

    next();
}

module.exports = userMiddleware;