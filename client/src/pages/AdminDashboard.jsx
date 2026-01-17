import { useEffect, useState } from 'react';
import API from '../api/axios';
import Sidebar from '../components/Sidebar.jsx';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);

    const fetchData = async () => {
        try {
            const statRes = await API.get('/admin/analytics');
            const userRes = await API.get('/admin/users');
            setStats(statRes.data);
            setUsers(userRes.data);
        } catch (err) {
            console.error("Failed to fetch admin data");
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleApprove = async (instructorId) => {
        try {
            await API.put('/admin/approve-instructor', { instructorId });
            alert("Instructor Approved!");
            fetchData(); // Refresh list
        } catch (err) {
            alert("Approval failed");
        }
    };

    return (
        <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen">
            <Sidebar />
            <main className="flex-1 p-4 sm:p-6 md:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8">Platform Overview</h2>
                
                {/* Stats Cards */}
                {stats ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12">
                        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-500">
                            <p className="text-gray-500 font-semibold uppercase text-sm">Total Users</p>
                            <p className="text-4xl font-bold">{stats.totalUsers}</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-500">
                            <p className="text-gray-500 font-semibold uppercase text-sm">Total Courses</p>
                            <p className="text-4xl font-bold">{stats.totalCourses}</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-purple-500">
                            <p className="text-gray-500 font-semibold uppercase text-sm">Total Instructors</p>
                            <p className="text-4xl font-bold">{stats.totalInstructors}</p>
                        </div>
                    </div>
                ) : <p>Loading stats...</p>}

                {/* User Management Table */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="p-4 sm:p-6 border-b bg-gray-50"><h3 className="font-bold text-lg">User Management</h3></div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="text-xs uppercase bg-gray-100 text-gray-500">
                                <tr>
                                    <th className="p-3 sm:p-4">Name</th>
                                    <th className="p-3 sm:p-4">Role</th>
                                    <th className="p-3 sm:p-4">Status</th>
                                    <th className="p-3 sm:p-4">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(u => (
                                    <tr key={u._id} className="border-t">
                                        <td className="p-3 sm:p-4 font-medium text-xs sm:text-sm">{u.name}</td>
                                        <td className="p-3 sm:p-4 uppercase text-xs font-bold">{u.role}</td>
                                        <td className="p-3 sm:p-4">
                                            {u.role === 'instructor' && !u.isApproved ? (
                                                <span className="text-amber-600 font-bold text-xs">Pending</span>
                                            ) : <span className="text-green-600 text-xs">Active</span>}
                                        </td>
                                        <td className="p-3 sm:p-4">
                                            {u.role === 'instructor' && !u.isApproved && (
                                                <button 
                                                    onClick={() => handleApprove(u._id)}
                                                    className="bg-indigo-600 text-white px-2 sm:px-3 py-1 rounded text-xs"
                                                >
                                                    Approve
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;