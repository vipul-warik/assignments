const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, User, Course } = require("../db");
const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
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

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const {title, description, price} = req.body;
    console.log(req.headers.username);
    if(!title || !description || !price){
        res.status(400).json({message: "Incomplete Information"});
    }

    const newCourse = await Course.create({title: title, description: description, price: price});
    console.log("newCourse", newCourse);
    const existingUser  = await Admin.findOne({username:req.headers.username});
    console.log("existingUser", existingUser);
    existingUser.courses.push(newCourse._id);

    await existingUser.save();

    res.status(200).json({"message": "course successfully added"});
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const courses = await Course.find({});

    res.status(200).json({"courses": courses});
});

module.exports = router;