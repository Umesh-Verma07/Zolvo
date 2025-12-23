import { useEffect, useState } from 'react';
import api from '../lib/axios';
import { Calendar, Clock, MapPin, User } from 'lucide-react';

interface Booking {
  _id: string;
  providerId: {
    name: string;
    category: string;
    phone: string;
  };
  date: string;
  time: string;
  address: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

const Bookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // TODO: Replace 'user_guest_123' with actual User ID later
        const res = await api.get('/bookings/user/user_guest_123');
        if (res.data.success) {
          setBookings(res.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch bookings", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <div className="p-8 text-center text-gray-500">Loading your bookings...</div>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-slate-800 px-1">My Bookings</h1>

      {bookings.length === 0 ? (
        <div className="text-center py-10 bg-white rounded-2xl border border-gray-200">
          <p className="text-gray-500">No bookings found yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
              {/* Header: Status & Category */}
              <div className="flex justify-between items-start mb-3">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                  booking.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {booking.status}
                </span>
                <span className="text-xs font-bold text-gray-400 uppercase">
                  {booking.providerId?.category || 'Service'}
                </span>
              </div>

              {/* Provider Info */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <User size={20} className="text-gray-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 capitalize">
                    {booking.providerId?.name || 'Unknown Worker'}
                  </h3>
                  <p className="text-xs text-gray-500">Provider</p>
                </div>
              </div>

              {/* Details: Date, Time, Address */}
              <div className="space-y-2 text-sm text-gray-600 bg-slate-50 p-3 rounded-xl">
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-primary" />
                  <span>{booking.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-primary" />
                  <span>{booking.time}</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin size={14} className="text-primary mt-1" />
                  <span className="flex-1 truncate">{booking.address}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookings;