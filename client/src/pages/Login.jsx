import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // Double check: are these variables defined in your useState?
        const res = await API.post('/auth/login', { email, password });
        
        console.log("Login Successful! User Data:", res.data.user);
        
        login(res.data.user, res.data.token);
        
        // Use the role from the response to navigate
        const userRole = res.data.user.role;
        if (userRole === 'admin') navigate('/admin-dashboard');
        else if (userRole === 'instructor') navigate('/instructor-dashboard');
        else navigate('/student-dashboard');
        
    } catch (err) {
        // This is key: show the EXACT message from the backend
        const message = err.response?.data?.message || "Login failed";
        alert(message);
    }
};

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">LMS Portal Login</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input 
                            type="email" required 
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input 
                            type="password" required 
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none">
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;