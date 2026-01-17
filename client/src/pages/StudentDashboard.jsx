import { useEffect, useState, useContext } from 'react';
import API from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import StudentSidebar from '../components/StudentSidebar';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Search, Star } from 'lucide-react';

const StudentDashboard = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await API.get('/courses');
                setCourses(res.data);
            } catch (err) {
                console.error("Error fetching course catalog");
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    return (
        <div className="flex flex-col md:flex-row bg-slate-50 min-h-screen">
            <StudentSidebar />
            <main className="flex-1 p-4 sm:p-6 md:p-8">
                <header className="mb-8 sm:mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-black text-slate-800">Welcome, {user?.name}!</h2>
                        <p className="text-sm sm:text-base text-slate-500">Find a course and start your learning journey today.</p>
                    </div>
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search courses..." 
                            className="pl-10 pr-4 py-2 rounded-full border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none w-full shadow-sm"
                        />
                    </div>
                </header>

                {loading ? (
                    <div className="text-center py-20 text-slate-400">Loading catalog...</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                        {courses.map(course => (
                            <div key={course._id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
                                <div className="h-40 bg-indigo-600 flex items-center justify-center relative">
                                    <BookOpen size={48} className="text-white opacity-20" />
                                    <span className="absolute top-4 left-4 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest">
                                        {course.category}
                                    </span>
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <h3 className="text-xl font-bold text-slate-800 mb-2 line-clamp-1">{course.title}</h3>
                                    <p className="text-slate-500 text-sm mb-6 line-clamp-2">{course.description}</p>
                                    
                                    <div className="flex items-center gap-2 mb-6 text-amber-500 text-sm font-bold">
                                        <Star size={14} fill="currentColor" /> 4.8 <span className="text-slate-300 font-normal">| {course.studentsEnrolled?.length || 0} Students</span>
                                    </div>

                                    <button 
                                        onClick={() => navigate(`/course-view/${course._id}`)}
                                        className="mt-auto w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200"
                                    >
                                        View Course Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default StudentDashboard;