const express = require('express');
const router = express.Router();
const { 
    createCourse, 
    getAllCourses, 
    enrollInCourse, 
    submitQuiz, 
    addLesson ,
    addQuiz ,
    addAssignment,
    getEnrolledStudents,
    getCourseSubmissions , getCourseById     // <--- Make sure this is here!
} = require('../controllers/courseController');
const { protect } = require('../middleware/authMiddleware');


// Public route: Anyone can see courses
router.get('/', getAllCourses);

// Protected route: Only logged-in instructors can create
router.post('/create', protect, createCourse);

router.post('/enroll/:id', protect, enrollInCourse);

router.post('/:id/submit-quiz', protect, submitQuiz);

router.post('/:id/add-lesson', protect, addLesson);

router.post('/:id/add-quiz', protect, addQuiz);

router.post('/:id/add-assignment', protect, addAssignment);

router.get('/:id/students', protect, getEnrolledStudents);

router.get('/:id/submissions', protect, getCourseSubmissions);

// Add this if missing
router.get('/:id', protect, getCourseById);

module.exports = router;