import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import InstructorSidebar from '../components/InstructorSidebar';

const AddQuiz = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [quizData, setQuizData] = useState({
        question: '',
        options: ['', '', '', ''],
        correctAnswerIndex: 0
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post(`/courses/${courseId}/add-quiz`, quizData);
            alert("Quiz question added!");
            setQuizData({ question: '', options: ['', '', '', ''], correctAnswerIndex: 0 });
        } catch (err) {
            alert("Error adding quiz");
        }
    };

    return (
        <div className="flex flex-col md:flex-row bg-gray-50 min-h-screen">
            <InstructorSidebar />
            <main className="flex-1 p-4 sm:p-6 md:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-6">Create Quiz MCQ</h2>
                <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-xl shadow-md space-y-4 max-w-2xl">
                    <input 
                        className="w-full p-3 border rounded text-sm" 
                        placeholder="Question" 
                        value={quizData.question}
                        onChange={(e) => setQuizData({...quizData, question: e.target.value})}
                    />
                    {quizData.options.map((opt, i) => (
                        <div key={i} className="flex gap-2 flex-col sm:flex-row">
                            <input 
                                type="radio" 
                                name="correct" 
                                checked={quizData.correctAnswerIndex === i}
                                onChange={() => setQuizData({...quizData, correctAnswerIndex: i})}
                                className="mt-2 sm:mt-0"
                            />
                            <input 
                                className="flex-1 p-2 border rounded text-sm" 
                                placeholder={`Option ${i+1}`}
                                value={opt}
                                onChange={(e) => {
                                    const newOpts = [...quizData.options];
                                    newOpts[i] = e.target.value;
                                    setQuizData({...quizData, options: newOpts});
                                }}
                            />
                        </div>
                    ))}
                    <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded font-bold">
                        Save Question
                    </button>
                </form>
            </main>
        </div>
    );
};

export default AddQuiz;