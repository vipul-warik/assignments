const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const jwt = require('jsonwebtoken');

// User Routes
router.post('/signup', async(req, res) => {
    // Implement user signup logic
    try {
        const {username, password} = req.body;

    if(!username || !password) {
        res.status(404).json({message: "username and password is required"});
    }

    const newUser = await User.create({username: username, password: password});

    res.status(200).json({message: "User created successfully"});

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

        const existingUser = await User.findOne({username: username});

        if(existingUser.password !== password) {
            res.status(400).json({message: "Invalid Password"});
        }

        const token = jwt.sign({username: username}, process.env.JWT_SECRET);

        return res.status(200).json({token: token});

    } catch (error) {
        return res.status(500).json({message: error.message});
    }
});

router.get('/courses', async(req, res) => {
    // Implement listing all courses logic
    const courses = await Course.find({});

    res.status(200).json({"courses": courses});
});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    // Implement course purchase logic
    const {courseId} = req.params;

    const course = await Course.findOne({_id: courseId});

    if(!course){
        return res.status(404).json({message:"Course not found"});
    }

    const user = await User.findOne({username: req.body.username});

    const index = user.courses.indexOf(courseId);

    if(index !== -1){
        return res.status(400).json({"message": "Course already purchased"});
    }

    user.courses.push(courseId);

    await user.save();

    return res.status(200).json({"message": "Course purchased successfully"})
});

router.get('/purchasedCourses', userMiddleware, async(req, res) => {
    // Implement fetching purchased courses logic
    const user = await User.findOne({username: req.body.username}).populate('courses');

    return res.status(200).json({"purchasedCourses": user.courses});
});

module.exports = router;