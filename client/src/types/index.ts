export interface User {
  _id: string;
  name: string;
  phone: string;
  role: "customer" | "provider";
  category?: string; // e.g. Plumber
  hourlyRate?: number;
  isAvailable?: boolean;
  location: {
    type: "Point";
    coordinates: number[]; // [Longitude, Latitude]
  };
}

// Map par dikhane ke liye simplified type
export interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  title: string;
  category: string;
}