import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import InstructorSidebar from '../components/InstructorSidebar';

const AddLesson = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [lesson, setLesson] = useState({ 
        title: '', 
        contentUrl: '', 
        contentType: 'video' // Matches your Backend Enum: ['video', 'pdf', 'link']
    });

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // Use the exact path defined in your router: /courses/:id/add-lesson
        const res = await API.post(`/courses/${courseId}/add-lesson`, lesson);
        
        alert("Lesson added successfully!");
        navigate('/instructor-dashboard');
    } catch (err) {
        // This will help us see if it's a 403 (Security) or 404 (Route not found)
        console.error("Submission Error:", err.response?.data);
        alert(err.response?.data?.message || "Error adding lesson");
    }
};

    return (
        <div className="flex flex-col md:flex-row bg-gray-50 min-h-screen">
            <InstructorSidebar />
            <main className="flex-1 p-4 sm:p-6 md:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8">Create Lesson Content</h2>
                <form onSubmit={handleSubmit} className="max-w-xl bg-white p-6 sm:p-8 rounded-xl shadow-md space-y-5">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Lesson Title</label>
                        <input type="text" required className="w-full p-3 border rounded-lg"
                            placeholder="e.g. Introduction to Variables"
                            onChange={(e) => setLesson({...lesson, title: e.target.value})} />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Content Type</label>
                        <select className="w-full p-3 border rounded-lg bg-gray-50"
                            onChange={(e) => setLesson({...lesson, contentType: e.target.value})}>
                            <option value="video">Video (YouTube/Vimeo)</option>
                            <option value="pdf">PDF Document</option>
                            <option value="link">External Resource Link</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">URL / Link</label>
                        <input type="text" required className="w-full p-3 border rounded-lg"
                            placeholder="Paste link here"
                            onChange={(e) => setLesson({...lesson, contentUrl: e.target.value})} />
                    </div>

                    <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition shadow-lg">
                        Save Lesson Content
                    </button>
                </form>
            </main>
        </div>
    );
};

export default AddLesson;