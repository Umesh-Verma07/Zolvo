import { useEffect, useState } from 'react';
import api from '../lib/axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Trash2, Users, Briefcase, Calendar, ShieldCheck } from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [stats, setStats] = useState({ totalUsers: 0, totalWorkers: 0, totalBookings: 0 });
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Security Check: Agar Admin nahi hai, toh bhaga do
    if (user && user.role !== 'admin') {
      navigate('/');
      return;
    }

    fetchData();
  }, [user]);

  const fetchData = async () => {
    try {
      const statsRes = await api.get('/admin/stats');
      const usersRes = await api.get('/admin/users');
      setStats(statsRes.data.stats);
      setUsers(usersRes.data.users);
      setLoading(false);
    } catch (error) {
      console.error("Admin Access Failed", error);
    }
  };

  const deleteUser = async (id: string) => {
    if(!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await api.delete(`/admin/user/${id}`);
      fetchData(); // Refresh list
    } catch (error) {
      alert("Failed to delete");
    }
  };

  if (loading) return <div className="p-10 text-center">Loading Admin Panel...</div>;

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <h1 className="text-3xl font-bold text-slate-800">Admin Dashboard</h1>

        {/* 📊 Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm font-bold uppercase">Total Customers</p>
                <h2 className="text-3xl font-bold text-slate-800">{stats.totalUsers}</h2>
              </div>
              <Users size={32} className="text-blue-500 opacity-50" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm font-bold uppercase">Service Providers</p>
                <h2 className="text-3xl font-bold text-slate-800">{stats.totalWorkers}</h2>
              </div>
              <Briefcase size={32} className="text-green-500 opacity-50" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-purple-500">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm font-bold uppercase">Total Bookings</p>
                <h2 className="text-3xl font-bold text-slate-800">{stats.totalBookings}</h2>
              </div>
              <Calendar size={32} className="text-purple-500 opacity-50" />
            </div>
          </div>
        </div>

        {/* 📋 User Management Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-slate-800">All Users & Workers</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 text-sm uppercase">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Details</th>
                  <th className="p-4">Aadhaar</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map((u) => (
                  <tr key={u._id} className="hover:bg-gray-50">
                    <td className="p-4 font-medium">
                      <div>{u.name}</div>
                      <div className="text-xs text-gray-400">{u.email}</div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${u.role === 'provider' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-600">
                      {u.role === 'provider' ? (
                        <>
                          <span className="block font-bold">{u.category}</span>
                          <span>₹{u.hourlyRate}/hr</span>
                        </>
                      ) : '-'}
                    </td>
                    <td className="p-4">
                        {u.role === 'provider' && u.aadhaarImage ? (
                            <a href={u.aadhaarImage} target="_blank" className="text-blue-600 text-sm hover:underline flex items-center gap-1">
                                <ShieldCheck size={14} /> View ID
                            </a>
                        ) : <span className="text-gray-400 text-xs">N/A</span>}
                    </td>
                    <td className="p-4 text-right">
                      {u.role !== 'admin' && (
                        <button onClick={() => deleteUser(u._id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors">
                          <Trash2 size={18} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;