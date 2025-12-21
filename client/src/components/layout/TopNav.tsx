import { UserCircle, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

const TopNav = () => {
    return (
        <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-100 shadow-sm">
            <div className="flex items-center justify-between px-4 h-16 max-w-5xl mx-auto">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 cursor-pointer">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-xl">Z</span>
                    </div>
                    <span className="text-xl font-bold text-slate-800 tracking-tight">Zolvo</span>
                </Link>

                {/* Right Icons */}
                <div className="flex items-center gap-4">
                    <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
                        <Bell size={20} />
                    </button>
                    <button className="p-1 text-primary bg-blue-50 rounded-full">
                        <UserCircle size={28} />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default TopNav;