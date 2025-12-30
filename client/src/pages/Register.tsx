import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import api from '../lib/axios';
import { useAuth } from '../context/AuthContext';
import { Briefcase, User, ShieldCheck, Camera, Upload, Loader2 } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [searchParams] = useSearchParams();
  
  // Check URL if user came from "Worker" link
  const initialRole = searchParams.get('role') === 'provider';

  const [isProvider, setIsProvider] = useState(initialRole);
  const [isLoading, setIsLoading] = useState(false); // Loading state add kiya
  
  // 🔥 Text Data State
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    password: '',
    category: 'Plumber',
    hourlyRate: '', 
    experience: '',
    about: '',
    aadhaar: ''
  });

  // 🔥 File Data State (Alag se)
  const [file, setFile] = useState<File | null>(null);
  
  const [error, setError] = useState('');

  // 📸 File Select Handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]); // Asli File object store karein
      setError(''); // Clear error if any
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validation
    if (isProvider) {
      if (formData.aadhaar.length !== 12) {
        setError("Aadhaar number must be exactly 12 digits.");
        setIsLoading(false);
        return;
      }
      if (!file) {
        setError("Please upload Aadhaar Card photo.");
        setIsLoading(false);
        return;
      }
    }

    try {
      // 🔥 FormData create karein (JSON ki jagah)
      const data = new FormData();
      
      // Common Fields
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('phone', formData.phone);
      data.append('password', formData.password);
      data.append('role', isProvider ? 'provider' : 'user');

      // Provider Fields
      if (isProvider) {
        data.append('category', formData.category);
        data.append('hourlyRate', formData.hourlyRate);
        data.append('experience', formData.experience);
        data.append('about', formData.about);
        data.append('aadhaar', formData.aadhaar);
        
        // 🔥 File attach karein
        if (file) {
          data.append('aadhaarImage', file);
        }
      }

      // API Call
      const res = await api.post('/auth/register', data, {
        headers: {
          'Content-Type': 'multipart/form-data', // Zaroori hai Multer ke liye
        },
      });

      if (res.data.success) {
        login(res.data.token, res.data.user);
        navigate('/');
      }

    } catch (err: any) {
      console.error("Registration Error:", err);
      // Agar file size ka error ho
      if(err.response?.status === 500 && err.response?.data?.message?.includes("File too large")) {
         setError("Image is too large. Please upload smaller image.");
      } else {
         setError(err.response?.data?.message || 'Registration failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const categories = ["Plumber", "Electrician", "Painter", "Carpenter", "Cleaner", "Driver", "Labor"];

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-slate-800">
            {isProvider ? 'Partner Registration' : 'Create Account'}
          </h1>
          <p className="text-gray-500 text-sm">
            {isProvider ? 'Upload ID to get verified' : 'Find best workers nearby'}
          </p>
        </div>

        {/* Role Switch */}
        <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
          <button type="button" onClick={() => setIsProvider(false)}
            className={`flex-1 py-2 text-sm font-bold rounded-lg flex items-center justify-center gap-2 transition-all ${!isProvider ? 'bg-white shadow-sm text-slate-900' : 'text-gray-500'}`}>
            <User size={16} /> Customer
          </button>
          <button type="button" onClick={() => setIsProvider(true)}
            className={`flex-1 py-2 text-sm font-bold rounded-lg flex items-center justify-center gap-2 transition-all ${isProvider ? 'bg-slate-900 shadow-sm text-white' : 'text-gray-500'}`}>
            <Briefcase size={16} /> Worker
          </button>
        </div>

        {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm font-medium">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-3">
          
          {/* --- Common Fields --- */}
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase">Full Name</label>
            <input type="text" required className="w-full p-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})} />
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase">Phone</label>
              <input type="tel" required className="w-full p-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})} />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase">Email</label>
              <input type="email" required className="w-full p-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})} />
            </div>
          </div>

          {/* --- WORKER SPECIFIC FIELDS --- */}
          {isProvider && (
            <div className="bg-blue-50 p-4 rounded-xl space-y-3 border border-blue-100">
              
              {/* Aadhaar Number */}
              <div>
                <label className="text-xs font-bold text-blue-700 uppercase flex items-center gap-1">
                  <ShieldCheck size={14} /> Aadhaar Number
                </label>
                <input type="text" maxLength={12} placeholder="12 Digit Aadhaar Number" required 
                  className="w-full p-2 border border-blue-200 rounded-lg outline-none tracking-widest"
                  value={formData.aadhaar}
                  onChange={(e) => setFormData({...formData, aadhaar: e.target.value})} />
              </div>

              {/* 🔥 Aadhaar Image Upload (File Input) */}
              <div>
                <label className="text-xs font-bold text-blue-700 uppercase flex items-center gap-1 mb-1">
                  <Camera size={14} /> Upload Aadhaar Photo
                </label>
                <div className="relative">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleFileChange} // Updated Handler
                    required={isProvider}
                    className="w-full p-2 bg-white border border-blue-200 rounded-lg text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                  />
                  {file && (
                    <div className="absolute top-2 right-2 text-green-600 bg-white rounded-full p-1 shadow-sm border border-green-100">
                      <Upload size={14} />
                    </div>
                  )}
                </div>
                {file && (
                  <p className="text-xs text-green-600 mt-1 font-medium px-1">Selected: {file.name}</p>
                )}
              </div>

              {/* Profession */}
              <div>
                <label className="text-xs font-bold text-blue-700 uppercase">Profession</label>
                <select className="w-full p-2 border border-blue-200 rounded-lg outline-none bg-white"
                  onChange={(e) => setFormData({...formData, category: e.target.value})} value={formData.category}>
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>

              {/* Rate & Experience */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-blue-700 uppercase">Rate (₹/hr)</label>
                  <input type="number" placeholder="200" required className="w-full p-2 border border-blue-200 rounded-lg outline-none"
                    value={formData.hourlyRate}
                    onChange={(e) => setFormData({...formData, hourlyRate: e.target.value})} />
                </div>
                <div>
                  <label className="text-xs font-bold text-blue-700 uppercase">Exp (Yrs)</label>
                  <input type="number" placeholder="2" required className="w-full p-2 border border-blue-200 rounded-lg outline-none"
                    value={formData.experience}
                    onChange={(e) => setFormData({...formData, experience: e.target.value})} />
                </div>
              </div>

              {/* About */}
              <div>
                <label className="text-xs font-bold text-blue-700 uppercase">About You</label>
                <textarea rows={2} placeholder="Describe your skills..." className="w-full p-2 border border-blue-200 rounded-lg outline-none"
                  value={formData.about}
                  onChange={(e) => setFormData({...formData, about: e.target.value})}></textarea>
              </div>
            </div>
          )}

          {/* Password */}
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase">Password</label>
            <input type="password" required className="w-full p-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})} />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors mt-2 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <> <Loader2 size={18} className="animate-spin" /> Verify & Registering... </>
            ) : (
              isProvider ? 'Join & Verify' : 'Sign Up'
            )}
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600 text-sm">
          Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;