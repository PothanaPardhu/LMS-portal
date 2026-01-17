import { useState, useEffect, useContext } from 'react';
import API from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import InstructorSidebar from '../components/InstructorSidebar';
import { useNavigate } from 'react-router-dom';

const CreateCourse = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({ title: '', description: '', category: '' });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                // Fetching the categories created by the Admin
                const res = await API.get('/admin/categories');
                console.log("Instructor saw these categories:", res.data); 
                setCategories(res.data);
            } catch (err) {
                console.error("Failed to load categories for instructor", err);
            }
        };
        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/courses/create', { ...formData, instructor: user.id });
            alert("Course created successfully!");
            navigate('/instructor-dashboard');
        } catch (err) {
            alert("Error creating course. Check if all fields are filled.");
        }
    };

    return (
        <div className="flex flex-col md:flex-row bg-gray-50 min-h-screen">
            <InstructorSidebar />
            <main className="flex-1 p-4 sm:p-6 md:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8">Step 1: Course Details</h2>
                <form onSubmit={handleSubmit} className="max-w-2xl bg-white p-6 sm:p-8 rounded-xl shadow-md space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
                        <input type="text" required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                            placeholder="e.g. Mastering React"
                            onChange={(e) => setFormData({...formData, title: e.target.value})} />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select required className="w-full p-3 border rounded-lg bg-gray-50 cursor-pointer"
                            onChange={(e) => setFormData({...formData, category: e.target.value})}>
                            <option value="">-- Choose Category --</option>
                            {categories.length > 0 ? (
                                categories.map(cat => (
                                    <option key={cat._id} value={cat.name}>{cat.name}</option>
                                ))
                            ) : (
                                <option disabled>No categories available - contact Admin</option>
                            )}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea rows="5" required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                            placeholder="What will students learn?"
                            onChange={(e) => setFormData({...formData, description: e.target.value})}></textarea>
                    </div>

                    <button type="submit" className="w-full bg-emerald-600 text-white py-3 rounded-lg font-bold hover:bg-emerald-700 transition shadow-lg">
                        Create Course Shell
                    </button>
                </form>
            </main>
        </div>
    );
};

export default CreateCourse;