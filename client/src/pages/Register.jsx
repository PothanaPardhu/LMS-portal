import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'student' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/auth/register', formData);
            alert("Registration successful! You can now login.");
            navigate('/login');
        } catch (err) {
            alert(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
            <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-6 sm:p-8 border border-gray-100">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-gray-900 mb-2">Create Account</h2>
                <p className="text-center text-gray-500 mb-8">Join the LMS community today</p>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                    <input type="text" placeholder="Full Name" required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
                        onChange={(e) => setFormData({...formData, name: e.target.value})} />
                    
                    <input type="email" placeholder="Email Address" required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
                        onChange={(e) => setFormData({...formData, email: e.target.value})} />
                    
                    <input type="password" placeholder="Password" required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
                        onChange={(e) => setFormData({...formData, password: e.target.value})} />
                    
                    <div className="flex flex-col">
                        <label className="text-sm font-bold text-gray-700 mb-2">Register as a:</label>
                        <select className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer" 
                            onChange={(e) => setFormData({...formData, role: e.target.value})}>
                            <option value="student">Student (I want to learn)</option>
                            <option value="instructor">Instructor (I want to teach)</option>
                        </select>
                    </div>

                    <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-indigo-700 transition shadow-lg">
                        Create Account
                    </button>
                </form>
                
                <p className="mt-6 text-center text-gray-600">
                    Already have an account? <Link to="/login" className="text-indigo-600 font-bold hover:underline">Sign In</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;