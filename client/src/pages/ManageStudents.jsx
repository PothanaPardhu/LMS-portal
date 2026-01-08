import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import InstructorSidebar from '../components/InstructorSidebar';
import { Mail, ArrowLeft, UserCheck } from 'lucide-react';

const ManageStudents = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                // Matches the getEnrolledStudents backend function
                const res = await API.get(`/courses/${courseId}/students`);
                setStudents(res.data);
            } catch (err) {
                console.error("Error fetching enrolled students");
            } finally {
                setLoading(false);
            }
        };
        fetchStudents();
    }, [courseId]);

    return (
        <div className="flex bg-slate-50 min-h-screen">
            <InstructorSidebar />
            <main className="flex-1 p-8">
                <button 
                    onClick={() => navigate('/instructor-dashboard')}
                    className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 mb-6 transition"
                >
                    <ArrowLeft size={18} /> Back to Dashboard
                </button>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                        <h2 className="text-2xl font-bold text-slate-800">Enrolled Students</h2>
                        <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-bold">
                            {students.length} Total
                        </span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 text-slate-500 uppercase text-xs font-bold tracking-wider">
                                    <th className="px-6 py-4">Student Name</th>
                                    <th className="px-6 py-4">Email Address</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {loading ? (
                                    <tr><td colSpan="4" className="p-10 text-center text-slate-400">Loading student list...</td></tr>
                                ) : students.length > 0 ? (
                                    students.map((student) => (
                                        <tr key={student._id} className="hover:bg-slate-50/80 transition">
                                            <td className="px-6 py-4 font-semibold text-slate-700">{student.name}</td>
                                            <td className="px-6 py-4 text-slate-500 flex items-center gap-2">
                                                <Mail size={14} /> {student.email}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="flex items-center gap-1 text-emerald-600 text-sm font-medium">
                                                    <UserCheck size={14} /> Active
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-indigo-600 font-bold text-sm hover:underline">
                                                    View Progress
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="p-20 text-center text-slate-400 italic">
                                            No students have enrolled in this course yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ManageStudents;