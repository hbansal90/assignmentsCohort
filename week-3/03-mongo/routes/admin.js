const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const {Admin} = require("../db/index")
const {Course} = require("../db/index")
// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    // check if they exists
   // Admin.findone
    Admin.create({
        username,
        password
    }).then( user=>{
        res.status(200).json({
            msg: "Admin Craeted Successfully!"
        })
    }).catch(err =>{
        res.status(404).json({
            msg: "Some error"
        })
    })

});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
    const courseTitle = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink;
    // Should validation using zod
    Course.create({
        title: courseTitle,
        description: description,
        price: price,
        imageLink: imageLink
    }).then(course =>{
        res.status(200).json({
            message: "Course Created Successfully",
            courseId: course._id
        })
    }).catch(err=>{
        res.send(404).json({
            message: "Error while creating course."
        })
    })
});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
    Course.find({})
    .then(courses=>{
        res.status(200).json(courses);
    }).catch(err =>{
        res.status(404).json({
            message: "Error while fetching the data"
        })
    })

});

module.exports = router;