import { Link } from 'react-router-dom';
import { BookOpen, Users, ShieldCheck } from 'lucide-react';

const Welcome = () => {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-6">
            <div className="max-w-4xl text-center">
                <div className="flex justify-center mb-6">
                    <div className="p-4 bg-indigo-600 rounded-2xl shadow-xl">
                        <BookOpen size={48} className="text-white" />
                    </div>
                </div>
                <h1 className="text-6xl font-black text-slate-900 mb-6 tracking-tight">
                    Smart <span className="text-indigo-600">LMS Portal</span>
                </h1>
                <p className="text-xl text-slate-600 mb-12 leading-relaxed">
                    A unified learning ecosystem for students to grow, instructors to inspire, and admins to manage.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    <Link to="/login" className="flex flex-col items-center p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition group border border-slate-100">
                        <Users className="text-indigo-600 mb-4 group-hover:scale-110 transition" size={32} />
                        <span className="text-2xl font-bold text-slate-800 mb-2">Existing User</span>
                        <span className="text-slate-500">Login to your dashboard</span>
                    </Link>
                    
                    <Link to="/register" className="flex flex-col items-center p-8 bg-indigo-600 rounded-2xl shadow-md hover:shadow-xl transition group">
                        <ShieldCheck className="text-white mb-4 group-hover:scale-110 transition" size={32} />
                        <span className="text-2xl font-bold text-white mb-2">New Member</span>
                        <span className="text-indigo-100">Create your free account</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Welcome;