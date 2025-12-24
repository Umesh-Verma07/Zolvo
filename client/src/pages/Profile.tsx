import { useAuth } from '../context/AuthContext';
import { LogOut, User, Mail, Phone, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if user is not authenticated
  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* 1. Page Title */}
        <h1 className="text-2xl font-bold text-slate-800">My Profile</h1>

        {/* 2. Profile Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-4 mb-6">
            {/* Avatar Circle */}
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-3xl font-bold text-primary border-4 border-white shadow-lg">
              {user.name[0].toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">{user.name}</h2>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-wide">
                {user.role} Account
              </span>
            </div>
          </div>

          {/* User Details List */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-600 bg-gray-50 p-3 rounded-xl">
              <Mail size={20} className="text-primary" />
              <div className="flex-1">
                <p className="text-xs text-gray-400 font-bold uppercase">Email Address</p>
                <p className="font-medium text-slate-800">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-gray-600 bg-gray-50 p-3 rounded-xl">
              <Phone size={20} className="text-primary" />
              <div className="flex-1">
                <p className="text-xs text-gray-400 font-bold uppercase">Phone Number</p>
                <p className="font-medium text-slate-800">{user.phone}</p>
              </div>
            </div>

            {/* Show Location only if it exists (mostly for providers) */}
            {/* Note: Normal users might not have location data yet */}
            <div className="flex items-center gap-3 text-gray-600 bg-gray-50 p-3 rounded-xl">
              <MapPin size={20} className="text-primary" />
              <div className="flex-1">
                <p className="text-xs text-gray-400 font-bold uppercase">Location</p>
                <p className="font-medium text-slate-800">India (Default)</p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Actions / Logout */}
        <button 
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 py-4 rounded-xl font-bold hover:bg-red-100 transition-colors border border-red-100"
        >
          <LogOut size={20} />
          Logout
        </button>

      </div>
    </div>
  );
};

export default Profile;