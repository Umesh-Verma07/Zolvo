import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, MapPin, CheckCircle } from 'lucide-react';
import api from '../lib/axios';
import { useAuth } from '../context/AuthContext'; // <--- Import Auth

interface Provider {
  _id: string;
  name: string;
  category: string;
  hourlyRate: number;
}

const BookingPage = () => {
  const { providerId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth(); // <--- Get current user
  
  const [provider, setProvider] = useState<Provider | null>(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    date: '',
    time: '',
    address: ''
  });

  // Check if user is logged in
  useEffect(() => {
    if (!user) {
      navigate('/login'); // Redirect to login if not authenticated
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchProvider = async () => {
      try {
        // Fetching nearby providers to find the specific one
        const res = await api.get(`/providers/nearby?lat=28.6139&long=77.2090&radius=5000`);
        const found = res.data.data.find((p: Provider) => p._id === providerId);
        setProvider(found);
      } catch (error) {
        console.error("Failed to load provider details", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProvider();
  }, [providerId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return; // Double check

    try {
      await api.post('/bookings', {
        userId: user.id, // <--- 🔥 REAL USER ID
        providerId,
        serviceType: provider?.category || 'General',
        ...formData
      });
      setSuccess(true);
      setTimeout(() => navigate('/bookings'), 2000); // Redirect to My Bookings page
    } catch (error) {
      alert("Booking Failed. Please try again.");
    }
  };

  if (loading) return <div className="p-8 text-center">Loading details...</div>;
  
  if (success) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 p-4">
        <CheckCircle className="text-green-600 w-20 h-20 mb-4" />
        <h1 className="text-2xl font-bold text-green-800">Booking Confirmed!</h1>
        <p className="text-green-600 mt-2">Redirecting to your bookings...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-safe">
      {/* Header */}
      <div className="bg-white p-4 sticky top-0 border-b border-gray-100 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft size={24} />
        </button>
        <h1 className="font-bold text-lg">Book Service</h1>
      </div>

      <main className="max-w-md mx-auto p-4 space-y-6">
        {/* Provider Summary */}
        {provider && (
          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-2xl">
              👷
            </div>
            <div>
              <h2 className="font-bold text-lg capitalize">{provider.name}</h2>
              <p className="text-gray-500 capitalize">{provider.category}</p>
              <p className="text-primary font-bold text-sm">₹{provider.hourlyRate}/hr</p>
            </div>
          </div>
        )}

        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Calendar size={16} /> Select Date
            </label>
            <input 
              type="date" required
              className="w-full p-3 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary"
              onChange={(e) => setFormData({...formData, date: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Clock size={16} /> Select Time
            </label>
            <input 
              type="time" required
              className="w-full p-3 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary"
              onChange={(e) => setFormData({...formData, time: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <MapPin size={16} /> Your Address
            </label>
            <textarea 
              rows={3} placeholder="House No, Street, Landmark..." required
              className="w-full p-3 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary resize-none"
              onChange={(e) => setFormData({...formData, address: e.target.value})}
            ></textarea>
          </div>

          <button type="submit" className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-slate-800 transition-transform active:scale-95 shadow-lg mt-4">
            Confirm Booking
          </button>
        </form>
      </main>
    </div>
  );
};

export default BookingPage;