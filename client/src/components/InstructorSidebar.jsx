import { Link } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, LogOut } from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const InstructorSidebar = () => {
    const { logout } = useContext(AuthContext);

    return (
        <div className="w-64 bg-slate-800 text-white min-h-screen p-4 flex flex-col">
            <h1 className="text-2xl font-bold mb-10 text-emerald-400">Instructor Hub</h1>
            <nav className="flex-1 space-y-2">
                <Link to="/instructor-dashboard" className="flex items-center space-x-3 p-3 rounded hover:bg-slate-700 transition">
                    <LayoutDashboard size={20} />
                    <span>My Dashboard</span>
                </Link>
                <Link to="/instructor/create-course" className="flex items-center space-x-3 p-3 rounded hover:bg-slate-700 transition">
                    <PlusCircle size={20} />
                    <span>Create Course</span>
                </Link>
            </nav>
            <button onClick={logout} className="flex items-center space-x-3 p-3 mt-auto text-red-400 hover:bg-slate-700 rounded transition">
                <LogOut size={20} />
                <span>Logout</span>
            </button>
        </div>
    );
};

export default InstructorSidebar;