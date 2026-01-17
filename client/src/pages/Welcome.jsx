import { Link } from 'react-router-dom';
import { BookOpen, Users, ShieldCheck } from 'lucide-react';

const Welcome = () => {
    return (
        <div 
            className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-8 relative overflow-hidden"
            style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
            }}
        >
            
            {/* Content wrapper */}
            <div className="relative z-10 max-w-4xl text-center w-full">
                <div className="flex justify-center mb-6">
                    <div className="p-3 sm:p-4 bg-indigo-600 rounded-2xl shadow-xl">
                        <BookOpen size={40} className="text-white sm:w-12 sm:h-12" />
                    </div>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
                    Smart <span className="text-yellow-300">LMS Portal</span>
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-gray-100 mb-12 leading-relaxed">
                    A unified learning ecosystem for students to grow, instructors to inspire, and admins to manage.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-12">
                    <Link to="/login" className="flex flex-col items-center p-6 sm:p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition group border border-slate-100 hover:scale-105">
                        <Users className="text-indigo-600 mb-4 group-hover:scale-110 transition" size={32} />
                        <span className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">Existing User</span>
                        <span className="text-sm sm:text-base text-slate-500">Login to your dashboard</span>
                    </Link>
                    
                    <Link to="/register" className="flex flex-col items-center p-6 sm:p-8 bg-indigo-600 rounded-2xl shadow-md hover:shadow-xl transition group hover:scale-105">
                        <ShieldCheck className="text-white mb-4 group-hover:scale-110 transition" size={32} />
                        <span className="text-xl sm:text-2xl font-bold text-white mb-2">New Member</span>
                        <span className="text-sm sm:text-base text-indigo-100">Create your free account</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Welcome;