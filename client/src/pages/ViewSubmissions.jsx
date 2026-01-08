import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/axios';
import InstructorSidebar from '../components/InstructorSidebar';
import { FileText, CheckCircle, Clock } from 'lucide-react';

const ViewSubmissions = () => {
    const { courseId } = useParams();
    const [assignments, setAssignments] = useState([]);
    const [grades, setGrades] = useState({});

    const fetchSubmissions = async () => {
        try {
            const res = await API.get(`/courses/${courseId}/submissions`);
            setAssignments(res.data);
        } catch (err) { console.error("Error fetching submissions"); }
    };

    useEffect(() => { fetchSubmissions(); }, [courseId]);

    const handleGrade = async (assignId, subId) => {
        try {
            await API.put(`/courses/grade-assignment`, {
                courseId,
                assignmentId: assignId,
                submissionId: subId,
                grade: grades[subId]
            });
            alert("Grade updated!");
            fetchSubmissions();
        } catch (err) { alert("Error updating grade"); }
    };

    return (
        <div className="flex bg-slate-50 min-h-screen">
            <InstructorSidebar />
            <main className="flex-1 p-8">
                <h2 className="text-3xl font-bold text-slate-800 mb-8">Assignment Submissions</h2>
                
                {assignments.map((assign) => (
                    <div key={assign.assignmentId} className="mb-10">
                        <h3 className="text-xl font-bold text-indigo-700 mb-4 flex items-center gap-2">
                            <FileText size={20}/> {assign.assignmentTitle}
                        </h3>
                        
                        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 border-b">
                                    <tr>
                                        <th className="p-4 text-sm font-bold text-slate-500">Student</th>
                                        <th className="p-4 text-sm font-bold text-slate-500">File</th>
                                        <th className="p-4 text-sm font-bold text-slate-500">Status</th>
                                        <th className="p-4 text-sm font-bold text-slate-500">Grade</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {assign.submissions.map((sub) => (
                                        <tr key={sub._id} className="border-b last:border-0">
                                            <td className="p-4 font-medium">{sub.student.name}</td>
                                            <td className="p-4">
                                                <a href={sub.fileUrl} target="_blank" className="text-indigo-600 hover:underline">Download Work</a>
                                            </td>
                                            <td className="p-4">
                                                {sub.status === 'Graded' ? 
                                                    <span className="text-emerald-600 flex items-center gap-1"><CheckCircle size={14}/> Graded</span> : 
                                                    <span className="text-amber-600 flex items-center gap-1"><Clock size={14}/> Pending</span>
                                                }
                                            </td>
                                            <td className="p-4 flex gap-2">
                                                <input 
                                                    type="number" 
                                                    className="w-16 p-1 border rounded"
                                                    placeholder={sub.grade || "0"}
                                                    onChange={(e) => setGrades({...grades, [sub._id]: e.target.value})}
                                                />
                                                <button 
                                                    onClick={() => handleGrade(assign.assignmentId, sub._id)}
                                                    className="bg-indigo-600 text-white px-3 py-1 rounded text-sm font-bold"
                                                >
                                                    Submit
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </main>
        </div>
    );
};

export default ViewSubmissions;