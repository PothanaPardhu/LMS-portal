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
        <div className="flex bg-gray-50 min-h-screen">
            <InstructorSidebar />
            <main className="flex-1 p-8">
                <h2 className="text-3xl font-bold mb-6">Create Quiz MCQ</h2>
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md space-y-4">
                    <input 
                        className="w-full p-3 border rounded" 
                        placeholder="Question" 
                        value={quizData.question}
                        onChange={(e) => setQuizData({...quizData, question: e.target.value})}
                    />
                    {quizData.options.map((opt, i) => (
                        <div key={i} className="flex gap-2">
                            <input 
                                type="radio" 
                                name="correct" 
                                checked={quizData.correctAnswerIndex === i}
                                onChange={() => setQuizData({...quizData, correctAnswerIndex: i})}
                            />
                            <input 
                                className="flex-1 p-2 border rounded" 
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