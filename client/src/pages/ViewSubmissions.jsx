import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/axios';
import InstructorSidebar from '../components/InstructorSidebar';
import { FileText, CheckCircle, Clock } from 'lucide-react';

const ViewSubmissions = () => {
    const { courseId } = useParams();
    const [assignments, setAssignments] = useState([]);
    const [grades, setGrades] = useState({});
    const [submitting, setSubmitting] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchSubmissions = async () => {
        try {
            setLoading(true);
            const res = await API.get(`/courses/${courseId}/submissions`);
            setAssignments(res.data);
        } catch (err) { 
            console.error("Error fetching submissions", err);
            alert("Failed to load submissions");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchSubmissions(); }, [courseId]);

    const handleGrade = async (assignId, subId) => {
        const gradeValue = grades[subId];
        
        if (!gradeValue || gradeValue === '') {
            alert('Please enter a grade');
            return;
        }

        if (isNaN(parseFloat(gradeValue)) || parseFloat(gradeValue) < 0) {
            alert('Grade must be a valid positive number');
            return;
        }

        setSubmitting(prev => ({ ...prev, [subId]: true }));

        try {
            console.log('Submitting grade:', { courseId, assignmentId: assignId, submissionId: subId, grade: gradeValue });
            
            const response = await API.put(`/courses/grade-assignment`, {
                courseId,
                assignmentId: assignId,
                submissionId: subId,
                grade: gradeValue
            });
            
            console.log('Grade response:', response.data);
            alert("Grade submitted successfully!");
            setGrades(prev => {
                const newGrades = { ...prev };
                delete newGrades[subId];
                return newGrades;
            });
            fetchSubmissions();
        } catch (err) { 
            console.error("Error updating grade:", err);
            const errorMsg = err.response?.data?.message || err.message || "Error updating grade";
            console.error("Full error:", err.response?.data || err);
            alert(errorMsg);
        } finally {
            setSubmitting(prev => ({ ...prev, [subId]: false }));
        }
    };

    if (loading) {
        return (
            <div className="flex bg-slate-50 min-h-screen">
                <InstructorSidebar />
                <main className="flex-1 p-8">
                    <p className="text-center text-slate-500">Loading submissions...</p>
                </main>
            </div>
        );
    }

    return (
        <div className="flex flex-col md:flex-row bg-slate-50 min-h-screen">
            <InstructorSidebar />
            <main className="flex-1 p-4 sm:p-6 md:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-8">Assignment Submissions</h2>
                
                {assignments.length === 0 ? (
                    <p className="text-center text-slate-500 py-10 text-sm">No submissions yet</p>
                ) : (
                    assignments.map((assign) => (
                        <div key={assign.assignmentId} className="mb-8 sm:mb-10">
                            <h3 className="text-lg sm:text-xl font-bold text-indigo-700 mb-4 flex items-center gap-2">
                                <FileText size={20}/> {assign.assignmentTitle}
                            </h3>
                            
                            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm">
                                        <thead className="bg-slate-50 border-b">
                                            <tr>
                                                <th className="p-3 sm:p-4 text-xs sm:text-sm font-bold text-slate-500">Student</th>
                                                <th className="p-3 sm:p-4 text-xs sm:text-sm font-bold text-slate-500 hidden sm:table-cell">File</th>
                                                <th className="p-3 sm:p-4 text-xs sm:text-sm font-bold text-slate-500">Status</th>
                                                <th className="p-3 sm:p-4 text-xs sm:text-sm font-bold text-slate-500">Grade</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {assign.submissions && assign.submissions.length > 0 ? (
                                                assign.submissions.map((sub) => (
                                                    <tr key={sub._id} className="border-b last:border-0 hover:bg-slate-50">
                                                        <td className="p-3 sm:p-4 font-medium text-xs sm:text-sm">{sub.student?.name || 'Unknown'}</td>
                                                        <td className="p-3 sm:p-4 text-xs sm:text-sm hidden sm:table-cell">
                                                            {sub.fileUrl ? (
                                                                <a href={sub.fileUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline font-medium">Download Work</a>
                                                            ) : (
                                                                <span className="text-slate-400">No file</span>
                                                            )}
                                                        </td>
                                                        <td className="p-3 sm:p-4 text-xs sm:text-sm">
                                                            {sub.status === 'Graded' ? 
                                                                <span className="text-emerald-600 flex items-center gap-1"><CheckCircle size={14}/> Graded</span> : 
                                                                <span className="text-amber-600 flex items-center gap-1"><Clock size={14}/> Pending</span>
                                                            }
                                                        </td>
                                                        <td className="p-3 sm:p-4 flex gap-1 sm:gap-2 flex-col sm:flex-row">
                                                            <input 
                                                                type="number" 
                                                                className="w-16 sm:w-20 p-1 sm:p-2 border border-slate-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none text-xs"
                                                                placeholder={sub.grade || "0"}
                                                                value={grades[sub._id] || ''}
                                                                onChange={(e) => setGrades({...grades, [sub._id]: e.target.value})}
                                                                disabled={submitting[sub._id]}
                                                            />
                                                            <button 
                                                                onClick={() => handleGrade(assign.assignmentId, sub._id)}
                                                                disabled={submitting[sub._id]}
                                                                className="bg-indigo-600 text-white px-2 sm:px-4 py-1 rounded text-xs font-bold hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
                                                            >
                                                                {submitting[sub._id] ? 'Saving...' : 'Submit'}
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="4" className="p-4 text-center text-slate-400 text-xs sm:text-sm">No submissions yet</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </main>
        </div>
    );
};

export default ViewSubmissions;