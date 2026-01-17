import { Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, FolderTree, LogOut } from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Sidebar = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <div className="w-full md:w-64 bg-gray-900 text-white md:min-h-screen p-3 md:p-4 flex md:flex-col flex-row justify-between md:justify-start mb-4 md:mb-0 rounded-lg md:rounded-none">
            <h1 className="text-lg md:text-2xl font-bold md:mb-10 text-indigo-400 hidden md:block">LMS Admin</h1>
            <nav className="flex md:flex-col gap-2 md:space-y-2 flex-1">
                <Link to="/admin-dashboard" className="flex items-center space-x-3 p-2 md:p-3 rounded hover:bg-gray-800 text-sm md:text-base whitespace-nowrap">
                    <LayoutDashboard size={20} />
                    <span className="hidden md:inline">Analytics</span>
                </Link>
                <Link to="/admin/users" className="flex items-center space-x-3 p-2 md:p-3 rounded hover:bg-gray-800 text-sm md:text-base whitespace-nowrap">
                    <Users size={20} />
                    <span className="hidden md:inline">Approve Instructors</span>
                </Link>
                <Link to="/admin/categories" className="flex items-center space-x-3 p-2 md:p-3 rounded hover:bg-gray-800 text-sm md:text-base whitespace-nowrap">
                    <FolderTree size={20} />
                    <span className="hidden md:inline">Categories</span>
                </Link>
            </nav>
            <button onClick={() => { logout(); navigate('/'); }} className="flex items-center space-x-3 p-2 md:p-3 md:mt-auto text-red-400 hover:bg-gray-800 rounded text-sm md:text-base whitespace-nowrap">
                <LogOut size={20} />
                <span className="hidden md:inline">Logout</span>
            </button>
        </div>
    );
};

export default Sidebar;