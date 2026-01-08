const Course = require('../models/Course');
const User = require('../models/User');

exports.createCourse = async (req, res) => {
    try {
        // Check if the user is actually an instructor
        if (req.user.role !== 'instructor') {
            return res.status(403).json({ message: "Access denied. Only instructors can create courses." });
        }

        const { title, description, category } = req.body;

        const newCourse = new Course({
            title,
            description,
            category,
            instructor: req.user.id // Taken from the JWT token
        });

        await newCourse.save();
        res.status(201).json({ message: "Course created successfully", course: newCourse });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate('instructor', 'name');
        res.json(courses);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.enrollInCourse = async (req, res) => {
    try {
        const courseId = req.params.id;
        const userId = req.user.id; // From JWT

        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ message: "Course not found" });

        // Check if already enrolled
        if (course.studentsEnrolled.includes(userId)) {
            return res.status(400).json({ message: "Already enrolled in this course" });
        }

        // Add student to course
        course.studentsEnrolled.push(userId);
        await course.save();

        // Add course to student's profile
        const user = await User.findById(userId);
        user.enrolledCourses.push(courseId);
        await user.save();

        res.json({ message: "Enrolled successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

exports.submitQuiz = async (req, res) => {
    try {
        const { answers } = req.body; // e.g. [0, 2, 1] (indices of chosen answers)
        const course = await Course.findById(req.params.id);
        
        if (!course) return res.status(404).json({ message: "Course not found" });

        let score = 0;
        course.quizzes.forEach((quiz, index) => {
            if (quiz.correctAnswerIndex === answers[index]) {
                score++;
            }
        });

        res.json({ 
            message: "Quiz evaluated", 
            score, 
            total: course.quizzes.length,
            percentage: (score / course.quizzes.length) * 100 
        });
    } catch (err) {
        res.status(500).json({ message: "Error submitting quiz" });
    }
};

exports.addLesson = async (req, res) => {
    try {
        const { title, contentUrl, contentType } = req.body;
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        // Add a console.log here to help us debug in the terminal
        console.log("Instructor ID from DB:", course.instructor.toString());
        console.log("User ID from Token:", req.user.id);

        if (course.instructor.toString() !== req.user.id) {
            return res.status(403).json({ message: "Access denied: Not your course" });
        }

        course.lessons.push({ title, contentUrl, contentType });
        await course.save();

        res.json({ message: "Lesson added successfully", course });
    } catch (err) {
        console.error(err); // This will show the real error in your VS Code terminal
        res.status(500).json({ message: "Error adding lesson", error: err.message });
    }
};

exports.addQuiz = async (req, res) => {
    try {
        const { question, options, correctAnswerIndex } = req.body;
        const course = await Course.findById(req.params.id);

        if (!course) return res.status(404).json({ message: "Course not found" });

        // Security check
        if (course.instructor.toString() !== req.user.id) {
            return res.status(403).json({ message: "Access denied" });
        }

        course.quizzes.push({ question, options, correctAnswerIndex });
        await course.save();

        res.json({ message: "Quiz question added successfully", course });
    } catch (err) {
        res.status(500).json({ message: "Error adding quiz" });
    }
};

// Student submits assignment
exports.submitAssignment = async (req, res) => {
    const { courseId, assignmentId, fileUrl } = req.body;
    const course = await Course.findById(courseId);
    
    const assignment = course.assignments.id(assignmentId);
    assignment.submissions.push({ student: req.user.id, fileUrl });
    
    await course.save();
    res.json({ message: "Assignment submitted!" });
};

// Instructor grades assignment
exports.gradeAssignment = async (req, res) => {
    const { courseId, assignmentId, submissionId, grade } = req.body;
    const course = await Course.findById(courseId);
    
    const assignment = course.assignments.id(assignmentId);
    const submission = assignment.submissions.id(submissionId);
    
    submission.grade = grade;
    submission.status = 'Graded';
    
    await course.save();
    res.json({ message: "Grade updated!" });
};

exports.completeLesson = async (req, res) => {
    try {
        const { courseId, lessonId } = req.body;
        const user = await User.findById(req.user.id);

        // Add lessonId to a 'completedLessons' array (we should add this to User model)
        if (!user.completedLessons) user.completedLessons = [];
        
        if (!user.completedLessons.includes(lessonId)) {
            user.completedLessons.push(lessonId);
            await user.save();
        }

        res.json({ message: "Lesson marked as completed", completedLessons: user.completedLessons });
    } catch (err) {
        res.status(500).json({ message: "Error updating progress" });
    }
};
// Add this to your courseController.js
exports.addAssignment = async (req, res) => {
    try {
        const { title, instructions } = req.body;
        const course = await Course.findById(req.params.id);

        if (!course) return res.status(404).json({ message: "Course not found" });

        // Security check: Only the owner can add assignments
        if (course.instructor.toString() !== req.user.id) {
            return res.status(403).json({ message: "Access denied" });
        }

        course.assignments.push({ title, instructions });
        await course.save();

        res.json({ message: "Assignment added successfully", course });
    } catch (err) {
        res.status(500).json({ message: "Error adding assignment", error: err.message });
    }
};

// Add this to your courseController.js
exports.getEnrolledStudents = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate('studentsEnrolled', 'name email');
        
        if (!course) return res.status(404).json({ message: "Course not found" });

        // Security check
        if (course.instructor.toString() !== req.user.id) {
            return res.status(403).json({ message: "Access denied" });
        }

        res.json(course.studentsEnrolled);
    } catch (err) {
        res.status(500).json({ message: "Error fetching students" });
    }
};

// Add to courseController.js
exports.getCourseSubmissions = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id)
            .populate('assignments.submissions.student', 'name email');
        
        if (!course) return res.status(404).json({ message: "Course not found" });
        if (course.instructor.toString() !== req.user.id) return res.status(403).json({ message: "Access denied" });

        // Flatten assignments to just show submissions for the UI
        const allSubmissions = course.assignments.map(assign => ({
            assignmentTitle: assign.title,
            assignmentId: assign._id,
            submissions: assign.submissions
        }));

        res.json(allSubmissions);
    } catch (err) {
        res.status(500).json({ message: "Error fetching submissions" });
    }
};
exports.getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate('instructor', 'name');
        if (!course) return res.status(404).json({ message: "Course not found" });
        res.json(course);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};