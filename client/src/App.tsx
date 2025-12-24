import { Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Home from './pages/Home';
import Search from './pages/Search';
import BookingPage from './pages/BookingPage';
import Bookings from './pages/Bookings';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

function App() {
  return (
    <Routes>

      {/* Public Auth Routes (No Layout) */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/" element={<AppLayout />}>

        {/* Home Route */}
        <Route index element={<Home />} />

        {/* Search Route */}
        <Route path="search" element={<Search />} />

        {/* Route for Booking */}
        <Route path="book/:providerId" element={<BookingPage />} />

        {/* Booking History Route */}
        <Route path="bookings" element={<Bookings />} />

        {/* Profile Route */}
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;