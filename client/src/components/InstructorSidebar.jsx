import { Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, LogOut } from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const InstructorSidebar = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <div className="w-full md:w-64 bg-slate-800 text-white md:min-h-screen p-3 md:p-4 flex md:flex-col flex-row justify-between md:justify-start mb-4 md:mb-0 rounded-lg md:rounded-none">
            <h1 className="text-lg md:text-2xl font-bold md:mb-10 text-emerald-400 hidden md:block">Instructor Hub</h1>
            <nav className="flex md:flex-col gap-2 md:space-y-2 flex-1">
                <Link to="/instructor-dashboard" className="flex items-center space-x-3 p-2 md:p-3 rounded hover:bg-slate-700 transition text-sm md:text-base whitespace-nowrap">
                    <LayoutDashboard size={20} />
                    <span className="hidden md:inline">My Dashboard</span>
                </Link>
                <Link to="/instructor/create-course" className="flex items-center space-x-3 p-2 md:p-3 rounded hover:bg-slate-700 transition text-sm md:text-base whitespace-nowrap">
                    <PlusCircle size={20} />
                    <span className="hidden md:inline">Create Course</span>
                </Link>
            </nav>
            <button onClick={() => { logout(); navigate('/'); }} className="flex items-center space-x-3 p-2 md:p-3 md:mt-auto text-red-400 hover:bg-slate-700 rounded transition text-sm md:text-base whitespace-nowrap">
                <LogOut size={20} />
                <span className="hidden md:inline">Logout</span>
            </button>
        </div>
    );
};

export default InstructorSidebar;