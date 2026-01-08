import { useEffect, useState, useContext } from 'react';
import API from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import InstructorSidebar from '../components/InstructorSidebar';
import { useNavigate, Link } from 'react-router-dom';
import { PlusCircle, Plus, BookOpen, FileText, HelpCircle, Users } from 'lucide-react';

const InstructorDashboard = () => {
    const [courses, setCourses] = useState([]);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMyCourses = async () => {
            try {
                const res = await API.get('/courses'); 
                
                // Filtering logic to handle both populated objects and string IDs
                const myCourses = res.data.filter(c => {
                    const instructorId = c.instructor._id || c.instructor;
                    return instructorId === user.id;
                });
                
                setCourses(myCourses);
            } catch (err) {
                console.error("Error fetching instructor courses:", err);
            }
        };

        if (user?.id) {
            fetchMyCourses();
        }
    }, [user.id]);

    return (
        <div className="flex bg-gray-50 min-h-screen">
            <InstructorSidebar />
            <main className="flex-1 p-8">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800">My Teaching Hub</h2>
                        <p className="text-gray-500">Manage your curriculum, quizzes, and student engagement.</p>
                    </div>
                    <button 
                        onClick={() => navigate('/instructor/create-course')}
                        className="bg-emerald-600 text-white px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-emerald-700 transition shadow-md font-semibold"
                    >
                        <PlusCircle size={20} /> Create New Course
                    </button>
                </div>

                {/* Course Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.length > 0 ? (
                        courses.map(course => (
                            <div key={course._id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all group">
                                {/* Card Banner */}
                                <div className="h-32 bg-gradient-to-r from-indigo-600 to-indigo-700 p-4 flex items-end relative">
                                    <BookOpen className="text-white/10 absolute top-4 right-4" size={60} />
                                    <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-[0.2em]">
                                        {course.category}
                                    </span>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-800 mb-5 line-clamp-1">{course.title}</h3>
                                    
                                    {/* Action Buttons Grid */}
                                    <div className="grid grid-cols-2 gap-3 mb-6">
                                        <Link 
                                            to={`/instructor/add-lesson/${course._id}`}
                                            className="flex items-center justify-center gap-2 bg-indigo-50 text-indigo-700 py-2.5 rounded-lg text-sm font-bold hover:bg-indigo-100 transition"
                                        >
                                            <Plus size={16} /> Content
                                        </Link>
                                        <Link 
                                            to={`/instructor/add-quiz/${course._id}`}
                                            className="flex items-center justify-center gap-2 bg-amber-50 text-amber-700 py-2.5 rounded-lg text-sm font-bold hover:bg-amber-100 transition"
                                        >
                                            <HelpCircle size={16} /> Quiz
                                        </Link>
                                        <Link 
                                            to={`/instructor/add-assignment/${course._id}`}
                                            className="flex items-center justify-center gap-2 bg-emerald-50 text-emerald-700 py-2.5 rounded-lg text-sm font-bold hover:bg-emerald-100 transition"
                                        >
                                            <FileText size={16} /> Task
                                        </Link>
                                        <Link 
                                            to={`/instructor/manage-students/${course._id}`}
                                            className="flex items-center justify-center gap-2 bg-slate-50 text-slate-700 py-2.5 rounded-lg text-sm font-bold hover:bg-slate-100 transition"
                                        >
                                            <Users size={16} /> Students
                                        </Link>
                                    </div>

                                    <button className="w-full text-indigo-600 text-xs font-bold py-2 border-t border-gray-100 hover:text-indigo-800 transition" onClick={() => navigate('/instructor/submissions/' + course._id)}>
                                        VIEW SUBMISSIONS & PROGRESS →
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        /* Empty State */
                        <div className="col-span-full bg-white p-16 rounded-2xl border-2 border-dashed border-gray-200 text-center">
                            <div className="inline-flex p-4 rounded-full bg-gray-50 text-gray-400 mb-4">
                                <PlusCircle size={40} />
                            </div>
                            <p className="text-gray-500 text-xl font-bold">No courses found in your library.</p>
                            <p className="text-gray-400 text-sm mt-2 mb-8">Start by creating your first course shell for your students.</p>
                            <button 
                                onClick={() => navigate('/instructor/create-course')}
                                className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition"
                            >
                                Create Your First Course
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default InstructorDashboard;