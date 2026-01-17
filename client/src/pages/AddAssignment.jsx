import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import InstructorSidebar from '../components/InstructorSidebar';

const AddAssignment = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    
    const [assignment, setAssignment] = useState({
        title: '',
        instructions: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // This matches the backend route: /courses/:id/add-assignment
            await API.post(`/courses/${courseId}/add-assignment`, assignment);
            alert("Assignment created successfully!");
            navigate('/instructor-dashboard');
        } catch (err) {
            alert(err.response?.data?.message || "Error creating assignment");
        }
    };

    return (
        <div className="flex flex-col md:flex-row bg-gray-50 min-h-screen">
            <InstructorSidebar />
            <main className="flex-1 p-4 sm:p-6 md:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8">Create New Assignment</h2>
                <form onSubmit={handleSubmit} className="max-w-2xl bg-white p-6 sm:p-8 rounded-xl shadow-md space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Assignment Title</label>
                        <input 
                            type="text" required
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                            placeholder="e.g. Final Project: Build a React App"
                            onChange={(e) => setAssignment({...assignment, title: e.target.value})}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Instructions</label>
                        <textarea 
                            rows="8" required
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                            placeholder="Provide detailed instructions on what the students need to submit..."
                            onChange={(e) => setAssignment({...assignment, instructions: e.target.value})}
                        ></textarea>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <button type="submit" className="flex-1 bg-emerald-600 text-white py-3 rounded-lg font-bold hover:bg-emerald-700 transition shadow-lg">
                            Post Assignment
                        </button>
                        <button 
                            type="button" 
                            onClick={() => navigate('/instructor-dashboard')}
                            className="flex-1 bg-gray-100 text-gray-600 py-3 rounded-lg font-bold hover:bg-gray-200 transition"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default AddAssignment;