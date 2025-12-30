import { useAuth } from '../context/AuthContext';
// Added ChevronRight for the arrow icon
import { LogOut, User, Mail, Phone, MapPin, ShieldAlert, ChevronRight } from 'lucide-react'; 
import { useNavigate, Link } from 'react-router-dom';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 pb-24">
      <div className="max-w-2xl mx-auto space-y-6">
        
        <h1 className="text-2xl font-bold text-slate-800">My Profile</h1>

        {/* 1. Main Profile Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
           <div className="flex items-center gap-4 mb-8">
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-3xl font-bold text-blue-600 border-4 border-white shadow-sm">
                {user.name[0].toUpperCase()}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800">{user.name}</h2>
                <div className="flex gap-2 mt-1">
                  <span className={`px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${user.role === 'admin' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-green-50 text-green-600 border-green-100'}`}>
                    {user.role} Account
                  </span>
                </div>
              </div>
           </div>

           <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-sm">
                  <Mail size={18} />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Email Address</p>
                  <p className="font-semibold text-slate-700">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                 <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-sm">
                   <Phone size={18} />
                 </div>
                 <div className="flex-1">
                   <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Phone Number</p>
                   <p className="font-semibold text-slate-700">{user.phone}</p>
                 </div>
              </div>
           </div>
        </div>

        {/* 🔥 2. REDESIGNED ADMIN BUTTON */}
        {user.role === 'admin' && (
          <Link to="/admin" className="block group">
            <div className="flex items-center justify-between p-5 bg-white border border-red-100 rounded-2xl shadow-sm hover:shadow-md transition-all hover:border-red-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ShieldAlert size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-lg group-hover:text-red-600 transition-colors">Admin Dashboard</h3>
                  <p className="text-xs text-gray-400 font-medium">Manage Users & Bookings</p>
                </div>
              </div>
              <div className="w-8 h-8 flex items-center justify-center text-gray-300 group-hover:text-red-500 transition-colors">
                <ChevronRight size={20} />
              </div>
            </div>
          </Link>
        )}

        {/* 3. Logout Button */}
        <button 
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 bg-white text-red-500 py-4 rounded-2xl font-bold hover:bg-red-50 transition-colors border border-red-100 shadow-sm"
        >
          <LogOut size={20} />
          Sign Out
        </button>

      </div>
    </div>
  );
};

export default Profile;