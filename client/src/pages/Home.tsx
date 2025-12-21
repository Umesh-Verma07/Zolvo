import { useState } from 'react';
import { Mic, Search, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MapWidget from '../components/ui/MapWidget';

const categories = [
    { id: 'plumber', name: 'Plumber', color: 'bg-blue-100 text-blue-600', img: '🔧' },
    { id: 'electrician', name: 'Electrician', color: 'bg-yellow-100 text-yellow-600', img: '💡' },
    { id: 'painter', name: 'Painter', color: 'bg-purple-100 text-purple-600', img: '🎨' },
    { id: 'labor', name: 'Labor', color: 'bg-orange-100 text-orange-600', img: '🏗️' },
    { id: 'cleaner', name: 'Cleaner', color: 'bg-green-100 text-green-600', img: '🧹' },
    { id: 'driver', name: 'Driver', color: 'bg-red-100 text-red-600', img: '🚗' },
];

const Home = () => {
    const navigate = useNavigate();
    const [isListening, setIsListening] = useState(false);

    // Voice Search Dummy Function (Baad mein real logic dalenge)
    const handleVoiceSearch = () => {
        setIsListening(true);
        alert("Voice Search abhi Phase 2 mein activate hoga! 🎙️");
        setTimeout(() => setIsListening(false), 1000);
    };

    return (
        <div className="space-y-6">
            {/* 1. Hero Section & Location */}
            <div className="bg-gradient-to-r from-primary to-blue-600 -mx-4 -mt-6 p-6 pb-12 rounded-b-[2rem] shadow-lg text-white">
                <div className="flex items-center gap-2 mb-4 opacity-90">
                    <MapPin size={18} />
                    <span className="text-sm font-medium">Auto-detecting Location...</span>
                </div>
                <h1 className="text-3xl font-bold leading-tight">
                    Kaam Chahiye? <br />
                    <span className="text-blue-100">Bas Bol Do!</span>
                </h1>
            </div>

            {/* 2. Search Bar (Floating) */}
            <div className="-mt-8 px-2 relative z-10">
                <div className="bg-white p-2 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-2">
                    <Search className="text-gray-400 ml-2" />
                    <input
                        type="text"
                        placeholder="Kya dhund rahe ho?"
                        className="flex-1 outline-none text-lg p-2 text-gray-700 placeholder:text-gray-400"
                    />
                    <button
                        onClick={handleVoiceSearch}
                        className={`p-3 rounded-xl transition-all ${isListening ? 'bg-red-500 animate-pulse' : 'bg-primary'
                            } text-white shadow-md active:scale-95`}
                    >
                        <Mic size={24} />
                    </button>
                </div>
            </div>

            {/* 3. Categories Grid */}
            <div>
                <h2 className="text-lg font-bold text-slate-800 mb-4 px-1">Services</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => navigate(`/search?category=${cat.id}`)}
                            className="flex flex-col items-center p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all active:scale-95"
                        >
                            <div className={`w-14 h-14 rounded-full ${cat.color} flex items-center justify-center text-2xl mb-3`}>
                                {cat.img}
                            </div>
                            <span className="font-semibold text-slate-700">{cat.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* 4. Live Map Section */}
            <div className="mt-6">
                <div className="flex justify-between items-end mb-3 px-1">
                    <h2 className="text-lg font-bold text-slate-800">Nearby Workers</h2>
                    <span className="text-xs text-primary font-medium">View All</span>
                </div>
                <MapWidget />
            </div>

            {/* 4. Banner / Promo */}
            <div className="bg-slate-900 rounded-2xl p-6 text-white flex justify-between items-center shadow-lg">
                <div>
                    <h3 className="font-bold text-lg">Worker ho?</h3>
                    <p className="text-slate-400 text-sm">Aaj hi join karein</p>
                </div>
                <button className="bg-white text-slate-900 px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-100">
                    Register
                </button>
            </div>
        </div>
    );
};

export default Home;