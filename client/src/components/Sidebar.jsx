import { Link } from 'react-router-dom';
import { LayoutDashboard, Users, FolderTree, LogOut } from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Sidebar = () => {
    const { logout } = useContext(AuthContext);

    return (
        <div className="w-64 bg-gray-900 text-white min-h-screen p-4 flex flex-col">
            <h1 className="text-2xl font-bold mb-10 text-indigo-400">LMS Admin</h1>
            <nav className="flex-1 space-y-2">
                <Link to="/admin-dashboard" className="flex items-center space-x-3 p-3 rounded hover:bg-gray-800">
                    <LayoutDashboard size={20} />
                    <span>Analytics</span>
                </Link>
                <Link to="/admin/users" className="flex items-center space-x-3 p-3 rounded hover:bg-gray-800">
                    <Users size={20} />
                    <span>Approve Instructors</span>
                </Link>
                <Link to="/admin/categories" className="flex items-center space-x-3 p-3 rounded hover:bg-gray-800">
                    <FolderTree size={20} />
                    <span>Categories</span>
                </Link>
            </nav>
            <button onClick={logout} className="flex items-center space-x-3 p-3 mt-auto text-red-400 hover:bg-gray-800 rounded">
                <LogOut size={20} />
                <span>Logout</span>
            </button>
        </div>
    );
};

export default Sidebar;