const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();
const jwt = require('jsonwebtoken');

// Admin Routes
router.post('/signup', async(req, res) => {
    // Implement admin signup logic
    try {
        const {username, password} = req.body;

    if(!username || !password) {
        res.status(404).json({message: "username and password is required"});
    }

    const newAdmin = await Admin.create({username: username, password: password});

    res.status(200).json({message: "Admin created successfully"});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.post('/signin', async(req, res) => {
    // Implement admin signup logic
    try {
        const {username, password} = req.body;

        if(!username || !password) {
            res.status(404).json({message: "username and password is required"});
        }

        const existingUser = await Admin.findOne({username: username});

        if(existingUser.password !== password) {
            res.status(400).json({message: "Invalid Password"});
        }

        const token = jwt.sign({username: username}, process.env.JWT_SECRET);

        return res.status(200).json({token: token});

    } catch (error) {
        return res.status(500).json({message: error.message});
    }
});

router.post('/courses', adminMiddleware, async(req, res) => {
    // Implement course creation logic
    const {title, description, price} = req.body;

    if(!title || !description || !price){
        res.status(400).json({message: "Incomplete Information"});
    }

    const newCourse = await Course.create({title: title, description: description, price: price});
    
    const existingUser  = await Admin.findOne({username:req.body.username});
    
    existingUser.courses.push(newCourse._id);

    await existingUser.save();

    res.status(200).json({"message": "course successfully added"});
});

router.get('/courses', adminMiddleware, async(req, res) => {
    // Implement fetching all courses logic
    const courses = await Course.find({});

    res.status(200).json({"courses": courses});
});

module.exports = router;