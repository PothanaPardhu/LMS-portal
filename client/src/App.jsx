import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import UserManagement from './pages/UserManagement';
import CategoryManagement from './pages/CategoryManagement';
import InstructorDashboard from './pages/InstructorDashboard';
import Login from './pages/Login';
import Wecome from './pages/Welcome';
import Register from './pages/Register';
import CreateCourse from './pages/CreateCourse';
import AddLesson from './pages/AddLesson';
import AddAssignment from './pages/AddAssignment';
import ManageStudents from './pages/ManageStudents';
import AddQuiz from './pages/AddQuiz';
import ViewSubmissions from './pages/ViewSubmissions';
import StudentDashboard from './pages/StudentDashboard';
import CourseView from './pages/CourseView';
import AttemptQuiz from './pages/AttemptQuiz';
import MyLearning from './pages/MyLearning';


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Wecome />} />
      
      {/* Role-based login routes */}
      <Route path="/login/:role" element={<Login />} />
      
      {/* Role-based registration routes */}
      <Route path="/register/:role" element={<Register />} />
        
        {/* Placeholder routes for now */}
        <Route path="/instructor/create-course" element={<CreateCourse />} />
        <Route path="/instructor/add-assignment/:courseId" element={<AddAssignment />} />
        <Route path="/instructor/add-lesson/:courseId" element={<AddLesson />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/instructor-dashboard" element={<InstructorDashboard />} />
        <Route path="/instructor/add-lesson/:courseId" element={<AddLesson />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/categories" element={<CategoryManagement />} />
        <Route path="/instructor/manage-students/:courseId" element={<ManageStudents />} />
        <Route path="/instructor/add-quiz/:courseId" element={<AddQuiz />} />
        <Route path="/instructor/submissions/:courseId" element={<ViewSubmissions />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/course-view/:courseId" element={<CourseView />} />
        <Route path="/student/attempt-quiz/:courseId" element={<AttemptQuiz />} />
        <Route path="/student/my-learning" element={<MyLearning />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;