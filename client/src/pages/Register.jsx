import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import API from '../api/axios';
import { ArrowLeft } from 'lucide-react';

const Register = () => {
    const { role } = useParams(); // Get role from URL params (student or instructor)
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: role || 'student' });
    const navigate = useNavigate();

    const getRoleDisplay = () => {
        const displayRole = role || 'student';
        return displayRole.charAt(0).toUpperCase() + displayRole.slice(1);
    };

    const getRoleColor = () => {
        const currentRole = role || 'student';
        switch(currentRole) {
            case 'student': return 'border-blue-200 shadow-blue-200/50';
            case 'instructor': return 'border-green-200 shadow-green-200/50';
            default: return 'border-gray-100';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/auth/register', formData);
            alert("Registration successful! You can now login.");
            navigate(`/login/${formData.role}`);
        } catch (err) {
            alert(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 py-8 relative">
            {/* Back Button */}
            <button 
                onClick={() => navigate(`/login/${role || 'student'}`)}
                className="absolute top-6 left-6 flex items-center gap-2 text-gray-700 hover:text-gray-900 transition"
            >
                <ArrowLeft size={20} />
                <span>Back to Login</span>
            </button>

            <div className={`max-w-md w-full bg-white rounded-xl shadow-2xl p-6 sm:p-8 border-2 ${getRoleColor()}`}>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-gray-900 mb-2">Create Account</h2>
                <p className="text-center text-gray-500 mb-2">Register as {getRoleDisplay()}</p>
                <p className="text-center text-gray-400 text-sm mb-8">Join the LMS community today</p>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                    <input 
                        type="text" 
                        placeholder="Full Name" 
                        required 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
                        onChange={(e) => setFormData({...formData, name: e.target.value})} 
                    />
                    
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        required 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
                        onChange={(e) => setFormData({...formData, email: e.target.value})} 
                    />
                    
                    <input 
                        type="password" 
                        placeholder="Password" 
                        required 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
                        onChange={(e) => setFormData({...formData, password: e.target.value})} 
                    />
                    
                    {/* Role Display - Read Only */}
                    <div className="flex flex-col">
                        <label className="text-sm font-bold text-gray-700 mb-2">Registering as:</label>
                        <div className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 font-medium">
                            {getRoleDisplay()}
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-indigo-700 transition shadow-lg">
                        Create Account
                    </button>
                </form>
                
                <p className="mt-6 text-center text-gray-600">
                    Already have an account? <Link to={`/login/${role || 'student'}`} className="text-indigo-600 font-bold hover:underline">Sign In</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;