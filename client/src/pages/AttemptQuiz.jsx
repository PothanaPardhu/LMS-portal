import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import StudentSidebar from '../components/StudentSidebar';
import { Send, CheckCircle, HelpCircle } from 'lucide-react';

const AttemptQuiz = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [result, setResult] = useState(null);

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const res = await API.get(`/courses/${courseId}`);
                setQuestions(res.data.quizzes || []);
            } catch (err) { console.error("Error loading quiz"); }
        };
        fetchQuiz();
    }, [courseId]);

    const handleSubmit = async () => {
        try {
            const orderedAnswers = questions.map((_, i) => answers[i]);
            const res = await API.post(`/courses/${courseId}/submit-quiz`, { answers: orderedAnswers });
            setResult(res.data);
        } catch (err) { alert("Submission failed. Ensure all questions are answered."); }
    };

    if (result) {
        return (
            <div className="flex flex-col md:flex-row bg-slate-50 min-h-screen">
                <StudentSidebar />
                <main className="flex-1 p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center">
                    <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-xl text-center max-w-md w-full border border-slate-100">
                        <CheckCircle className="mx-auto text-emerald-500 mb-4" size={64} />
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">Quiz Result</h2>
                        <div className="text-5xl sm:text-6xl font-black text-indigo-600 my-6">{result.percentage}%</div>
                        <p className="text-slate-500 mb-8 text-sm sm:text-base">You got {result.score} out of {result.total} correct!</p>
                        <button onClick={() => navigate('/student-dashboard')} className="w-full bg-slate-800 text-white py-3 rounded-xl font-bold text-sm sm:text-base">Return to Dashboard</button>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="flex flex-col md:flex-row bg-slate-50 min-h-screen">
            <StudentSidebar />
            <main className="flex-1 p-4 sm:p-6 md:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-8 sm:mb-10 flex items-center gap-3">
                    <HelpCircle className="text-indigo-600" /> Course Assessment
                </h2>
                <div className="max-w-3xl space-y-4 sm:space-y-6">
                    {questions.map((q, qIdx) => (
                        <div key={qIdx} className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-200">
                            <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-4">{qIdx + 1}. {q.question}</h3>
                            <div className="grid gap-2 sm:gap-3">
                                {q.options.map((opt, oIdx) => (
                                    <label key={oIdx} className={`p-3 sm:p-4 border rounded-xl cursor-pointer transition text-sm sm:text-base ${answers[qIdx] === oIdx ? 'border-indigo-600 bg-indigo-50' : 'border-slate-100 hover:bg-slate-50'}`}>
                                        <input type="radio" name={`q${qIdx}`} className="mr-3" onChange={() => setAnswers({...answers, [qIdx]: oIdx})} />
                                        {opt}
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                    <button onClick={handleSubmit} className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition">
                        <Send size={20} /> Submit Assessment
                    </button>
                </div>
            </main>
        </div>
    );
};
export default AttemptQuiz;