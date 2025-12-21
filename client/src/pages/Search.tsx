import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import MapWidget from '../components/ui/MapWidget';
import { Search as SearchIcon, Filter, Star, Phone, ArrowLeft } from 'lucide-react';
import api from '../lib/axios';

const Search = () => {
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category') || '';
    const navigate = useNavigate();

    // List view ke liye alag state
    const [providers, setProviders] = useState<any[]>([]);

    useEffect(() => {
        // List fetch karne ke liye (Map wala logic duplicate kar rahe hain taaki list bhi dikhe)
        const fetchList = async () => {
            try {
                let url = `/providers/nearby?lat=28.6139&long=77.2090&radius=5000`; // Short URL
                if (category) url += `&category=${category.toLowerCase()}`;

                const res = await api.get(url); // 'api' use karein
                if (res.data.success) setProviders(res.data.data);
            } catch (err) { console.error(err); }
        };
        fetchList();
    }, [category]);

    return (
        <div className="space-y-4">
            {/* 1. Header & Search Input */}
            <div className="sticky top-16 bg-slate-50 z-30 pb-2">
                <div className="flex gap-2 items-center mb-4">
                    {/* 🔥 NEW: Back Button */}
                    <button
                        onClick={() => navigate(-1)}
                        className="p-3 bg-white border border-gray-200 rounded-xl shadow-sm active:scale-95"
                    >
                        <ArrowLeft size={20} className="text-gray-600" />
                    </button>
                    <div className="flex-1 bg-white flex items-center px-4 py-3 rounded-xl border border-gray-200 shadow-sm">
                        <SearchIcon className="text-gray-400 mr-2" size={20} />
                        <input
                            type="text"
                            placeholder="Search services..."
                            className="flex-1 outline-none text-slate-700"
                            defaultValue={category}
                        />
                    </div>
                    <button className="p-3 bg-white border border-gray-200 rounded-xl shadow-sm">
                        <Filter size={20} className="text-gray-600" />
                    </button>
                </div>

                {/* Categories Tabs (Quick Switch) */}
                <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                    {['All', 'Plumber', 'Electrician', 'Painter', 'Cleaner'].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => navigate(cat === 'All' ? '/search' : `/search?category=${cat}`)}
                            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${(category.toLowerCase() === cat.toLowerCase()) || (cat === 'All' && !category)
                                ? 'bg-primary text-white shadow-md'
                                : 'bg-white text-gray-600 border border-gray-200'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* 2. Map Section */}
            <div className="h-[250px] w-full bg-gray-100 rounded-2xl overflow-hidden border border-gray-200">
                <MapWidget category={category} />
            </div>

            {/* 3. Results List */}
            <div className="space-y-3 pb-20">
                <h2 className="font-bold text-slate-800 text-lg">
                    {providers.length} Results Found
                </h2>

                {providers.map((worker) => (
                    <div key={worker._id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex gap-4 items-start hover:shadow-md transition-shadow">
                        <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
                            👷
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-slate-800 capitalize">{worker.name}</h3>
                                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-bold">
                                    ₹{worker.hourlyRate}/hr
                                </span>
                            </div>
                            <p className="text-sm text-gray-500 capitalize mb-2">{worker.category} • 2.5 km away</p>

                            <div className="flex items-center gap-3">
                                <div className="flex items-center text-yellow-500 text-sm font-bold">
                                    <Star size={14} className="fill-current mr-1" />
                                    4.8
                                </div>
                                <button className="flex-1 bg-slate-900 text-white py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2">
                                    <Phone size={14} /> Call Now
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Search;