const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const username = req.headers.username;
    const password = req.headers.password;
    User.create({
        username,
        password,
        purchasesCourses: []
    }).then(user => {
        res.status(200).json({
            message: "User created successfully"
        })
    }).catch(err =>{
        res.status(403).json({
            messsage: "Some erroe while authorisation"
        })
    })

});

router.get('/courses', userMiddleware, (req, res) => {
    // Implement listing all courses logic
    Course.find({}).then(courses =>{
        res.status(200).json({
            courses
        })
    }).catch(err => { 
        res.status(403).json({
            message: "Some error while accessing"
        })
    })
});

router.post('/courses/:courseId', userMiddleware, (req, res) => {
    // Implement course purchase logic
    const courseToBuy = req.params.courseId;
    User.updateOne(
        {username: req.headers.username},
        {
            $push: {
                purchasesCourses: courseToBuy
            }
        }
    ).then(updatedUser=>{
        res.status(200).json({
            message: "Course purchased successfully",
            updatedUser
        })
    }).catch(err =>{
        res.status(404).json({
            message: "Error, failed"
        })
    })

});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const user = await User.findOne({
        username: req.headers.username
    })
    const courses = await Course.find({
        _id:{
            "$in": user.purchasesCourses
        }
    })
    res.status(200).json({
        courses: courses
    })


})
module.exports = router