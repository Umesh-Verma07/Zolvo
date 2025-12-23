import { Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Home from './pages/Home';
import Search from './pages/Search';
import BookingPage from './pages/BookingPage';
import Bookings from './pages/Bookings';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        {/* Home Route */}
        <Route index element={<Home />} />

        {/* Search Route */}
        <Route path="search" element={<Search />} />

        {/* Route for Booking */}
        <Route path="book/:providerId" element={<BookingPage />} />

        {/* Booking History Route */}
        <Route path="bookings" element={<Bookings />} />

        {/* Future routes yahan aayenge */}
        <Route path="profile" element={<div className="p-4">👤 Profile Page Coming Soon...</div>} />
      </Route>
    </Routes>
  );
}

export default App;