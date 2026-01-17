import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import StudentSidebar from '../components/StudentSidebar';
import { PlayCircle, FileText, CheckCircle } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const CourseView = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [course, setCourse] = useState(null);
    const [showUpload, setShowUpload] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedAssignmentId, setSelectedAssignmentId] = useState('');
    const [uploading, setUploading] = useState(false);
    const [uploadMessage, setUploadMessage] = useState('');
    const [enrolling, setEnrolling] = useState(false);
    const [enrolled, setEnrolled] = useState(false);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const res = await API.get(`/courses/${courseId}`);
                setCourse(res.data);
                // Check if the current user is already enrolled
                if (res.data.studentsEnrolled && user && res.data.studentsEnrolled.includes(user.id)) {
                    setEnrolled(true);
                }
            } catch (err) { 
                console.error("Error fetching course", err);
                alert("Failed to load course details");
            }
        };
        fetchCourse();
    }, [courseId, user]);

    const enroll = async () => {
        if (enrolling) return; // Prevent multiple submissions
        
        setEnrolling(true);
        try {
            const response = await API.post(`/courses/enroll/${courseId}`);
            setEnrolled(true);
            alert("Enrolled Successfully! " + (response.data?.course || ""));
            // Refresh course data to show enrollment status
            window.location.reload();
        } catch (err) { 
            console.error("Enrollment error:", err);
            const errorMsg = err.response?.data?.message || "Enrollment failed. Please try again.";
            alert(errorMsg);
        } finally {
            setEnrolling(false);
        }
    };

    const unenroll = async () => {
        if (window.confirm("Are you sure you want to unenroll from this course?")) {
            setEnrolling(true);
            try {
                const response = await API.post(`/courses/unenroll/${courseId}`);
                setEnrolled(false);
                alert("Unenrolled Successfully!");
                // Refresh page to show unenrolled status
                window.location.reload();
            } catch (err) { 
                console.error("Unenrollment error:", err);
                const errorMsg = err.response?.data?.message || "Unenrollment failed. Please try again.";
                alert(errorMsg);
            } finally {
                setEnrolling(false);
            }
        }
    };

    if (!course) return <p className="p-10 text-center">Loading course...</p>;

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
        setUploadMessage('');
    };

    const submitAssignment = async (e) => {
        e.preventDefault();
        if (!selectedAssignmentId) return alert('Please select an assignment to submit');
        if (!selectedFile) return alert('Please choose a file to upload');

        const allowed = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];
        if (!allowed.includes(selectedFile.type)) return alert('Only PDF or Word documents are allowed');

        setUploading(true);
        setUploadMessage('Uploading...');

        try {
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('assignmentId', selectedAssignmentId);

            const response = await API.post(`/courses/${courseId}/submit-assignment`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            setUploadMessage('Assignment submitted successfully!');
            alert('Assignment submitted successfully!');
            setShowUpload(false);
            setSelectedFile(null);
            setSelectedAssignmentId('');
        } catch (err) {
            console.error('Upload error', err.response || err);
            const errorMsg = err.response?.data?.message || 'Failed to submit assignment';
            setUploadMessage(`Error: ${errorMsg}`);
            alert(errorMsg);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="flex flex-col md:flex-row bg-slate-50 min-h-screen">
            <StudentSidebar />
            <main className="flex-1 p-4 sm:p-6 md:p-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200 mb-8">
                        <h2 className="text-3xl sm:text-4xl font-black text-slate-800 mb-4">{course.title}</h2>
                        <p className="text-sm sm:text-lg text-slate-600 mb-8">{course.description}</p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            {!enrolled ? (
                                <button 
                                    onClick={enroll} 
                                    disabled={enrolling}
                                    className={`px-8 py-3 rounded-xl font-bold transition ${
                                        enrolling 
                                            ? 'bg-gray-400 text-white cursor-not-allowed' 
                                            : 'bg-emerald-600 text-white hover:bg-emerald-700'
                                    }`}
                                >
                                    {enrolling ? 'Enrolling...' : 'Enroll in Course'}
                                </button>
                            ) : (
                                <>
                                    <button 
                                        disabled={true}
                                        className="px-8 py-3 rounded-xl font-bold bg-slate-400 text-white cursor-not-allowed"
                                    >
                                        ✓ Already Enrolled
                                    </button>
                                    <button 
                                        onClick={unenroll} 
                                        disabled={enrolling}
                                        className={`px-8 py-3 rounded-xl font-bold transition ${
                                            enrolling 
                                                ? 'bg-gray-400 text-white cursor-not-allowed' 
                                                : 'bg-red-600 text-white hover:bg-red-700'
                                        }`}
                                    >
                                        {enrolling ? 'Unenrolling...' : 'Unenroll'}
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        {/* Lessons List */}
                        <div className="space-y-4">
                            <h3 className="text-lg sm:text-xl font-bold text-slate-800">Learning Lessons</h3>
                            {course.lessons?.map((lesson, i) => (
                                <div key={i} className="bg-white p-3 sm:p-4 rounded-xl flex items-center gap-3 sm:gap-4 border border-slate-100 hover:border-indigo-300 transition group">
                                    <PlayCircle className="text-indigo-600 group-hover:scale-110 transition shrink-0" size={20} />
                                    <div className="flex-1 min-w-0">
                                        <p className="font-bold text-slate-800 text-sm sm:text-base truncate">{lesson.title}</p>
                                        <a href={lesson.contentUrl} target="_blank" className="text-xs text-indigo-500 hover:underline">Watch Content</a>
                                    </div>
                                    <CheckCircle size={18} className="text-slate-200 shrink-0" />
                                </div>
                            ))}
                        </div>

                        {/* Quizzes & Assignments */}
                        <div className="space-y-4">
                            <h3 className="text-lg sm:text-xl font-bold text-slate-800">Quizzes & Tasks</h3>
                            <button 
                                onClick={() => navigate(`/student/attempt-quiz/${courseId}`)}
                                className="w-full bg-amber-50 text-amber-700 p-3 sm:p-4 rounded-xl border border-amber-100 font-bold hover:bg-amber-100 transition flex justify-between text-sm sm:text-base"
                            >
                                Start Final Quiz <span>Attempt →</span>
                            </button>
                            <div>
                                <button onClick={() => { setShowUpload(prev => !prev); if (course.assignments?.length) setSelectedAssignmentId(course.assignments[0]._id); }} className="w-full bg-slate-800 text-white p-3 sm:p-4 rounded-xl font-bold hover:bg-slate-900 transition flex justify-between text-sm sm:text-base">
                                    Submit Assignment <span>Upload →</span>
                                </button>

                                {showUpload && (
                                    <form onSubmit={submitAssignment} className="mt-4 bg-white p-4 sm:p-6 rounded-xl border border-slate-200 shadow-sm">
                                        <div className="mb-4">
                                            <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-2">Select Assignment</label>
                                            <select 
                                                value={selectedAssignmentId} 
                                                onChange={(e) => setSelectedAssignmentId(e.target.value)} 
                                                className="w-full p-2 sm:p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                                                disabled={uploading}
                                            >
                                                <option value="">-- Choose assignment --</option>
                                                {course.assignments?.map(a => (
                                                    <option key={a._id} value={a._id}>{a.title}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="mb-4">
                                            <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-3">Upload File (PDF / Word Document)</label>
                                            <div className="relative">
                                                <input 
                                                    accept=".pdf,.doc,.docx" 
                                                    type="file" 
                                                    onChange={handleFileChange} 
                                                    className="w-full p-2 sm:p-3 border-2 border-dashed border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none file:mr-2 sm:file:mr-4 file:py-1 sm:file:py-2 file:px-2 sm:file:px-4 file:rounded-lg file:border-0 file:text-xs sm:file:text-sm file:font-bold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 cursor-pointer"
                                                    disabled={uploading}
                                                />
                                            </div>
                                            {selectedFile && (
                                                <p className="mt-2 text-xs sm:text-sm text-green-600 font-medium">✓ Selected: {selectedFile.name}</p>
                                            )}
                                        </div>

                                        {uploadMessage && (
                                            <p className={`mb-4 text-xs sm:text-sm font-medium p-2 sm:p-3 rounded ${uploadMessage.startsWith('Error') ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'}`}>
                                                {uploadMessage}
                                            </p>
                                        )}

                                        <div className="flex flex-col sm:flex-row gap-3">
                                            <button 
                                                type="submit" 
                                                className="flex-1 bg-emerald-600 text-white px-4 py-2 sm:py-3 rounded-lg font-bold hover:bg-emerald-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition text-sm sm:text-base"
                                                disabled={uploading}
                                            >
                                                {uploading ? 'Uploading...' : 'Submit Assignment'}
                                            </button>
                                            <button 
                                                type="button" 
                                                onClick={() => setShowUpload(false)} 
                                                className="flex-1 px-4 py-2 sm:py-3 rounded-lg border border-slate-300 font-bold hover:bg-slate-100 disabled:bg-gray-100 disabled:cursor-not-allowed transition text-sm sm:text-base"
                                                disabled={uploading}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CourseView;