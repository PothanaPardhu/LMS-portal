import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import API from '../api/axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Login = () => {
    const { role } = useParams(); // Get role from URL params (student, instructor, admin)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const getRoleDisplay = () => {
        switch(role) {
            case 'student': return 'Student';
            case 'instructor': return 'Instructor';
            case 'admin': return 'Admin';
            default: return 'User';
        }
    };

    const getRoleColor = () => {
        switch(role) {
            case 'student': return 'bg-blue-600';
            case 'instructor': return 'bg-green-600';
            case 'admin': return 'bg-red-600';
            default: return 'bg-indigo-600';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post('/auth/login', { email, password });
            
            console.log("Login Successful! User Data:", res.data.user);
            
            // Verify the user's role matches the login page role
            if (res.data.user.role !== role) {
                alert(`This account is registered as ${res.data.user.role}, not ${role}. Please login with the correct role.`);
                return;
            }
            
            login(res.data.user, res.data.token);
            
            // Navigate based on role
            if (res.data.user.role === 'admin') navigate('/admin-dashboard');
            else if (res.data.user.role === 'instructor') navigate('/instructor-dashboard');
            else navigate('/student-dashboard');
            
        } catch (err) {
            const message = err.response?.data?.message || "Login failed";
            alert(message);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 px-4 py-8">
            {/* Back Button */}
            <button 
                onClick={() => navigate('/')}
                className="absolute top-6 left-6 flex items-center gap-2 text-white hover:text-gray-300 transition"
            >
                <ArrowLeft size={20} />
                <span>Back</span>
            </button>

            <div className={`max-w-md w-full ${getRoleColor()} rounded-lg shadow-xl p-6 sm:p-8`}>
                <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-2">Login as {getRoleDisplay()}</h2>
                <p className="text-center text-gray-100 mb-8">Enter your credentials to continue</p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-white">Email Address</label>
                        <input 
                            type="email" 
                            required 
                            value={email}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-0"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white">Password</label>
                        <input 
                            type="password" 
                            required 
                            value={password}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-0"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-900 bg-white hover:bg-gray-100 focus:outline-none">
                        Sign In
                    </button>
                </form>

                {/* Create Account Button - Only for Student and Instructor */}
                {(role === 'student' || role === 'instructor') && (
                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <p className="text-center text-gray-100 mb-4">Don't have an account?</p>
                        <button
                            onClick={() => navigate(`/register/${role}`)}
                            className="w-full flex justify-center py-2 px-4 border border-white rounded-md shadow-sm text-sm font-medium text-white hover:bg-white hover:text-gray-600 focus:outline-none transition"
                        >
                            Create Account
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;