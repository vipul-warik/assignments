const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://vipulwarik:GfkQ0FbEgzaabdur@cluster0.fvvbzk5.mongodb.net/udemy02');

// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username: {
        type: String,
        required: true,
        unique: true,
      },
    
      password: {
        type: String,
        required: true,
      },

      courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
      }],
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    username: {
        type: String,
        required: true,
        unique: true,
      },
    
      password: {
        type: String,
        required: true,
      },

      courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
      }],
});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
    title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      imageLink: {
        type: String,
        default: 'https://linktoimage.com',
      },
      published: {
        type: Boolean,
        default: true,
      },
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}