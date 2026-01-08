import { Link } from 'react-router-dom';
import { Layout, BookOpen, GraduationCap, LogOut } from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const StudentSidebar = () => {
    const { logout } = useContext(AuthContext);

    return (
        <div className="w-64 bg-indigo-900 text-white min-h-screen p-4 flex flex-col">
            <h1 className="text-2xl font-bold mb-10 flex items-center gap-2">
                <GraduationCap /> Student Portal
            </h1>
            <nav className="flex-1 space-y-2">
                <Link to="/student-dashboard" className="flex items-center space-x-3 p-3 rounded hover:bg-indigo-800 transition">
                    <Layout size={20} />
                    <span>Course Catalog</span>
                </Link>
                <Link to="/student/my-learning" className="flex items-center space-x-3 p-3 rounded hover:bg-indigo-800 transition">
                    <BookOpen size={20} />
                    <span>My Learning</span>
                </Link>
            </nav>
            <button onClick={logout} className="flex items-center space-x-3 p-3 mt-auto text-indigo-300 hover:bg-indigo-800 rounded transition">
                <LogOut size={20} />
                <span>Logout</span>
            </button>
        </div>
    );
};
export default StudentSidebar;