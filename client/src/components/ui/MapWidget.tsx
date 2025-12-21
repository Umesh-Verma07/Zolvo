import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { divIcon } from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { User as UserIcon, Wrench, Zap, PaintBucket, Car } from 'lucide-react';
import api from '../../lib/axios';

const getIconForCategory = (category: string) => {
    switch (category?.toLowerCase()) {
        case 'electrician': return <Zap size={20} />;
        case 'painter': return <PaintBucket size={20} />;
        case 'driver': return <Car size={20} />;
        default: return <Wrench size={20} />;
    }
};

const createIcon = (icon: any, color: string) => {
    return divIcon({
        className: 'bg-transparent',
        html: renderToStaticMarkup(
            <div className={`p-2 rounded-full border-2 border-white shadow-lg ${color} text-white`}>
                {icon}
            </div>
        ),
        iconSize: [40, 40],
        iconAnchor: [20, 40],
    });
};

const userIcon = createIcon(<UserIcon size={20} />, 'bg-blue-600');

// Prop receive kar rahe hain
const MapWidget = ({ category }: { category?: string }) => {
    const [providers, setProviders] = useState<any[]>([]);
    const myLocation: [number, number] = [28.6139, 77.2090];

    useEffect(() => {
        const fetchProviders = async () => {
            try {
                // Note: Ab hume pura http://localhost... likhne ki zarurat nahi
                let url = `/providers/nearby?lat=${myLocation[0]}&long=${myLocation[1]}&radius=5000`;

                if (category) {
                    url += `&category=${category.toLowerCase()}`;
                }

                const res = await api.get(url); // axios ki jagah 'api' use karein

                if (res.data.success) {
                    setProviders(res.data.data);
                }
            } catch (error) {
                console.error("Error fetching providers:", error);
            }
        };

        fetchProviders();
    }, [category]); // 🔥 Jab category badlegi, Map refresh hoga

    return (
        <div className="h-full w-full rounded-2xl overflow-hidden shadow-inner border border-gray-200 relative z-0">
            <MapContainer center={myLocation} zoom={13} scrollWheelZoom={false} className="h-full w-full">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={myLocation} icon={userIcon}>
                    <Popup>You</Popup>
                </Marker>
                {providers.map((worker) => {
                    const [lng, lat] = worker.location.coordinates;
                    return (
                        <Marker key={worker._id} position={[lat, lng]} icon={createIcon(getIconForCategory(worker.category), 'bg-green-600')}>
                            <Popup>
                                <div className="font-bold capitalize">{worker.name}</div>
                                <div className="text-xs text-gray-500 capitalize">{worker.category}</div>
                                <div className="text-xs font-bold text-blue-600">₹{worker.hourlyRate}/hr</div>
                            </Popup>
                        </Marker>
                    );
                })}
            </MapContainer>
        </div>
    );
};

export default MapWidget;