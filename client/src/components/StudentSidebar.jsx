import { Link, useNavigate } from 'react-router-dom';
import { Layout, BookOpen, GraduationCap, LogOut } from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const StudentSidebar = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <div className="w-full md:w-64 bg-indigo-900 text-white md:min-h-screen p-3 md:p-4 flex md:flex-col flex-row justify-between md:justify-start mb-4 md:mb-0 rounded-lg md:rounded-none">
            <h1 className="text-lg md:text-2xl font-bold md:mb-10 items-center gap-2 hidden md:flex">
                <GraduationCap /> Student Portal
            </h1>
            <nav className="flex md:flex-col gap-2 md:space-y-2 flex-1">
                <Link to="/student-dashboard" className="flex items-center space-x-3 p-2 md:p-3 rounded hover:bg-indigo-800 transition text-sm md:text-base whitespace-nowrap">
                    <Layout size={20} />
                    <span className="hidden md:inline">Course Catalog</span>
                </Link>
                <Link to="/student/my-learning" className="flex items-center space-x-3 p-2 md:p-3 rounded hover:bg-indigo-800 transition text-sm md:text-base whitespace-nowrap">
                    <BookOpen size={20} />
                    <span className="hidden md:inline">My Learning</span>
                </Link>
            </nav>
            <button onClick={() => { logout(); navigate('/'); }} className="flex items-center space-x-3 p-2 md:p-3 md:mt-auto text-indigo-300 hover:bg-indigo-800 rounded transition text-sm md:text-base whitespace-nowrap">
                <LogOut size={20} />
                <span className="hidden md:inline">Logout</span>
            </button>
        </div>
    );
};
export default StudentSidebar;