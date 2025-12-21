# 🛠️ Zolvo - Hyperlocal Service Booking Platform

> **Kaam Chahiye? Bas Bol Do!** 🗣️

Zolvo is a location-based service booking platform that connects users with nearby workers (Plumbers, Electricians, etc.) in real-time. Built with a "Mobile-First" approach and Scalable Architecture.

<!-- ![Zolvo App](https://via.placeholder.com/800x400?text=Zolvo+App+Preview) -->

## 🚀 Features (Implemented)
- **📍 Live Geo-Tracking:** Find providers within a 5km radius using MongoDB Geospatial queries.
- **🗺️ Interactive Map:** Real-time visualization of nearby workers using Leaflet Maps.
- **🔍 Smart Search:** Filter workers by category (Plumber, Electrician, etc.).
- **📱 Mobile-First Design:** Professional UI built with Tailwind CSS.
- **⚡ High Performance:** Optimized Backend with Lite queries and React 18 on Frontend.

## 🏗️ Tech Stack

### Backend (Server)
- **Runtime:** Node.js & Express.js (TypeScript)
- **Database:** MongoDB Atlas (Cloud) with Geospatial Indexing
- **Architecture:** MVC (Model-View-Controller) with SOLID Principles

### Frontend (Client)
- **Framework:** React 18 (Vite + TypeScript)
- **Styling:** Tailwind CSS + Lucide Icons
- **Maps:** React-Leaflet (OpenStreetMap)
- **State:** React Hooks & Axios

---

## ⚙️ Getting Started

Follow these steps to set up the project locally.

### 1. Clone the Repository
```bash
git clone https://github.com/Umesh-Verma07/Zolvo.git
cd Zolvo
```

### 2. Backend Setup (Server)

Navigate to the server folder and install dependencies.

```bash
cd server
npm install
```

Configure Environment Variables: Create a ``` .env ``` file in the ``` server```  directory:

```bash
PORT=8000
MONGO_URI=your_mongodb_connection_string
```

### 3. Frontend Setup (Client)

Open a new terminal, navigate to the client folder, and install dependencies.

```bash
cd client
npm install
```

Configure Environment Variables: Create a ``` .env ``` file in the ``` client ``` directory:

```bash
VITE_API_URL=http://localhost:8000/api
```

Start the Application:

```bash
npm run dev
```

## 🛣️ Project Roadmap

* [x] **Phase 1:** Setup Backend, Map Integration, Search & Filter (Completed).
* [ ] **Phase 2:** Booking System & Appointment Scheduling.
* [ ] **Phase 3:** User & Provider Authentication (Login/Signup).
* [ ] **Phase 4:** Voice Search Integration using AI.
* [ ] **Phase 5:** Payment Gateway Integration.

---

## 🤝 Contributing

Contributions are welcome!
1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/NewFeature`).
3. Commit your Changes (`git commit -m 'Add some NewFeature'`).
4. Push to the Branch (`git push origin feature/NewFeature`).
5. Open a Pull Request.

---

**Built with ❤️ for the Zolvo Startup**