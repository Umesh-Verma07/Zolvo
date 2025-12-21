import { Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Home from './pages/Home';
import Search from './pages/Search';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        {/* Jab user '/' par aayega, Home dikhega */}
        <Route index element={<Home />} />
        
        {/* Naya Search Route */}
        <Route path="search" element={<Search />} />

        {/* Future routes yahan aayenge */}
        <Route path="bookings" element={<div className="p-4">📅 Bookings Page Coming Soon...</div>} />
        <Route path="profile" element={<div className="p-4">👤 Profile Page Coming Soon...</div>} />
      </Route>
    </Routes>
  );
}

export default App;