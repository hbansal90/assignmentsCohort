const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://harshstarbansal:nfiDwyyJcYdN68ql@clusterforlearning.kxiaczj.mongodb.net/?retryWrites=true&w=majority&appName=ClusterForLearning');

// Define schemas
const AdminSchema = new mongoose.Schema({
    username: String,
    password: String
})
const UserSchema = new mongoose.Schema({
    // Schema definition here
    username: String,
    password: String,
    purchasesCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
});

const CourseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imageLink: String
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}