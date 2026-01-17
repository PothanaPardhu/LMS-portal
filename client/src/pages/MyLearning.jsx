import { useEffect, useState, useContext } from 'react';
import API from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import StudentSidebar from '../components/StudentSidebar';
import { useNavigate } from 'react-router-dom';
import { BookOpen, CheckCircle, Play } from 'lucide-react';

const MyLearning = () => {
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEnrolledCourses = async () => {
            try {
                const res = await API.get('/courses');
                // Filter courses where current student is enrolled
                const filtered = res.data.filter(course => 
                    course.studentsEnrolled.includes(user.id)
                );
                setEnrolledCourses(filtered);
            } catch (err) {
                console.error("Error fetching enrolled courses");
            } finally {
                setLoading(false);
            }
        };

        if (user?.id) fetchEnrolledCourses();
    }, [user.id]);

    return (
        <div className="flex flex-col md:flex-row bg-slate-50 min-h-screen">
            <StudentSidebar />
            <main className="flex-1 p-4 sm:p-6 md:p-8">
                <header className="mb-8 sm:mb-10">
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-800">My Learning</h2>
                    <p className="text-sm sm:text-base text-slate-500">Pick up right where you left off.</p>
                </header>

                {loading ? (
                    <p className="text-slate-400 text-sm">Loading your courses...</p>
                ) : enrolledCourses.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        {enrolledCourses.map(course => (
                            <div key={course._id} className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 group hover:shadow-md transition">
                                <div className="h-20 w-20 sm:h-24 sm:w-24 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition shrink-0">
                                    <BookOpen size={28} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg sm:text-xl font-bold text-slate-800">{course.title}</h3>
                                    <p className="text-xs sm:text-sm text-slate-500 mb-3">{course.category}</p>
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                                        <button 
                                            onClick={() => navigate(`/course-view/${course._id}`)}
                                            className="flex items-center gap-2 bg-slate-900 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-bold hover:bg-slate-700 transition"
                                        >
                                            <Play size={14} fill="currentColor" /> Continue
                                        </button>
                                        <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                                            <CheckCircle size={14} /> Enrolled
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed">
                        <p className="text-slate-500 mb-4">You haven't enrolled in any courses yet.</p>
                        <button 
                            onClick={() => navigate('/student-dashboard')}
                            className="text-indigo-600 font-bold hover:underline"
                        >
                            Browse the Catalog →
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
};

export default MyLearning;