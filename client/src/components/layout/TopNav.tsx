import { UserCircle, Bell, Home, Search, Calendar, LogIn } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { useAuth } from '../../context/AuthContext'; // <--- Auth Import Kiya

const TopNav = () => {
  const location = useLocation();
  const { user } = useAuth(); // <--- Check kar rahe hain ki user hai ya nahi

  // Navigation Items
  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Search, label: 'Search', path: '/search' },
    { icon: Calendar, label: 'Bookings', path: '/bookings' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="flex items-center justify-between px-6 h-16 max-w-7xl mx-auto">
        
        {/* 1. Logo Section */}
        <Link to="/" className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-sm shadow-blue-200">
            <span className="text-white font-bold text-xl">Z</span>
          </div>
          <span className="text-xl font-bold text-slate-800 tracking-tight">Zolvo</span>
        </Link>

        {/* 2. Center Navigation */}
        <nav className="hidden md:flex items-center p-1 bg-gray-100/80 rounded-full border border-gray-200/50">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                className={clsx(
                  'flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-200',
                  isActive 
                    ? 'bg-white text-primary shadow-sm ring-1 ring-black/5' 
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200/50'
                )}
              >
                <item.icon size={16} strokeWidth={isActive ? 2.5 : 2} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* 3. Right Side (Auth Logic) */}
        <div className="flex items-center gap-3">
          
          {/* Notification Icon (Always visible) */}
          <button className="p-2.5 text-gray-500 hover:bg-gray-100 rounded-full transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>
          
          {/* 🔥 Condition: Agar User hai toh Profile, nahi toh Login Button */}
          {user ? (
            <Link to="/profile" className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
              <div className="w-8 h-8 bg-gradient-to-tr from-blue-100 to-blue-50 rounded-full flex items-center justify-center text-primary font-bold border border-blue-200">
                {user.name[0].toUpperCase()} {/* Name ka pehla letter */}
              </div>
            </Link>
          ) : (
            <Link to="/login" className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-full text-sm font-bold hover:bg-slate-800 transition-transform active:scale-95 shadow-md">
              <LogIn size={16} />
              <span>Login</span>
            </Link>
          )}

        </div>
      </div>
    </header>
  );
};

export default TopNav;