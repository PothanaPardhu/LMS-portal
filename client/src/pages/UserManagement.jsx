import { useEffect, useState } from 'react';
import API from '../api/axios';
import Sidebar from '../components/Sidebar';

const UserManagement = () => {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const res = await API.get('/admin/users');
            setUsers(res.data);
        } catch (err) {
            console.error("Failed to fetch users");
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleApprove = async (instructorId) => {
        try {
            await API.put('/admin/approve-instructor', { instructorId });
            alert("Instructor approved successfully!");
            fetchUsers(); // Refresh the list
        } catch (err) {
            alert("Approval failed");
        }
    };

    return (
        <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen">
            <Sidebar />
            <main className="flex-1 p-4 sm:p-6 md:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8">User Management</h2>
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full leading-normal text-sm">
                            <thead>
                                <tr className="bg-gray-200 text-gray-600 uppercase text-xs leading-normal font-bold">
                                    <th className="py-3 px-3 sm:px-6 text-left">Name</th>
                                    <th className="py-3 px-3 sm:px-6 text-left hidden sm:table-cell">Email</th>
                                    <th className="py-3 px-3 sm:px-6 text-center">Role</th>
                                    <th className="py-3 px-3 sm:px-6 text-center">Status</th>
                                    <th className="py-3 px-3 sm:px-6 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 font-light">
                                {users.map((user) => (
                                    <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-100">
                                        <td className="py-3 px-3 sm:px-6 text-left whitespace-nowrap font-medium text-xs sm:text-sm">{user.name}</td>
                                        <td className="py-3 px-3 sm:px-6 text-left hidden sm:table-cell text-xs sm:text-sm">{user.email}</td>
                                        <td className="py-3 px-3 sm:px-6 text-center">
                                            <span className={`py-1 px-2 sm:px-3 rounded-full text-xs ${user.role === 'admin' ? 'bg-purple-200 text-purple-600' : user.role === 'instructor' ? 'bg-blue-200 text-blue-600' : 'bg-green-200 text-green-600'}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="py-3 px-3 sm:px-6 text-center">
                                            {user.isApproved ? (
                                                <span className="text-green-500 font-bold text-xs sm:text-sm">Approved</span>
                                            ) : (
                                                <span className="text-red-500 font-bold text-xs sm:text-sm">Pending</span>
                                            )}
                                        </td>
                                        <td className="py-3 px-3 sm:px-6 text-center">
                                            {user.role === 'instructor' && !user.isApproved && (
                                                <button 
                                                    onClick={() => handleApprove(user._id)}
                                                    className="bg-indigo-600 text-white px-2 sm:px-4 py-1 rounded hover:bg-indigo-700 transition text-xs"
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

export default UserManagement;