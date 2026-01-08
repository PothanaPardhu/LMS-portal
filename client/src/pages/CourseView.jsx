import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import StudentSidebar from '../components/StudentSidebar';
import { PlayCircle, FileText, CheckCircle } from 'lucide-react';

const CourseView = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const res = await API.get(`/courses/${courseId}`);
                setCourse(res.data);
            } catch (err) { console.error("Error fetching course"); }
        };
        fetchCourse();
    }, [courseId]);

    const enroll = async () => {
        try {
            await API.post(`/courses/enroll/${courseId}`);
            alert("Enrolled Successfully!");
            window.location.reload();
        } catch (err) { alert("Enrollment failed"); }
    };

    if (!course) return <p className="p-10 text-center">Loading course...</p>;

    return (
        <div className="flex bg-slate-50 min-h-screen">
            <StudentSidebar />
            <main className="flex-1 p-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 mb-8">
                        <h2 className="text-4xl font-black text-slate-800 mb-4">{course.title}</h2>
                        <p className="text-slate-600 text-lg mb-8">{course.description}</p>
                        <button onClick={enroll} className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-700 transition">
                            Enroll in Course
                        </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Lessons List */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-slate-800">Learning Lessons</h3>
                            {course.lessons?.map((lesson, i) => (
                                <div key={i} className="bg-white p-4 rounded-xl flex items-center gap-4 border border-slate-100 hover:border-indigo-300 transition group">
                                    <PlayCircle className="text-indigo-600 group-hover:scale-110 transition" />
                                    <div className="flex-1">
                                        <p className="font-bold text-slate-800">{lesson.title}</p>
                                        <a href={lesson.contentUrl} target="_blank" className="text-xs text-indigo-500 hover:underline">Watch Content</a>
                                    </div>
                                    <CheckCircle size={18} className="text-slate-200" />
                                </div>
                            ))}
                        </div>

                        {/* Quizzes & Assignments */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-slate-800">Quizzes & Tasks</h3>
                            <button 
                                onClick={() => navigate(`/student/attempt-quiz/${courseId}`)}
                                className="w-full bg-amber-50 text-amber-700 p-4 rounded-xl border border-amber-100 font-bold hover:bg-amber-100 transition flex justify-between"
                            >
                                Start Final Quiz <span>Attempt →</span>
                            </button>
                            <button className="w-full bg-slate-800 text-white p-4 rounded-xl font-bold hover:bg-slate-900 transition flex justify-between">
                                Submit Assignment <span>Upload →</span>
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CourseView;