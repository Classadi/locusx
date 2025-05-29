

---

```md
# 🚚 Real-Time Location Tracker for Multivendor Delivery Platform

This is a full-stack web application inspired by Rapido/Dunzo that enables real-time location tracking of delivery partners within a multivendor marketplace. Vendors can assign delivery partners to orders, delivery partners can share live location, and customers can track them on a map that auto-updates every 2–3 seconds.

---

## 📌 Features

### 🔐 Authentication
- JWT-based login/signup for vendors, delivery partners, and customers.
- Session persistence using secure tokens.

### 🧑‍💼 Vendor Dashboard
- View list of orders.
- Assign delivery partners to orders.

### 🛵 Delivery Partner Dashboard
- View assigned orders.
- Start delivery tracking — sends live geolocation every 2–3 seconds.
- Animated GPS feedback using Framer Motion.

### 👤 Customer Dashboard
- Track the real-time location of the delivery partner on a live Leaflet map.
- Map auto-updates with latest coordinates via Socket.IO.

---

## 🏗️ Tech Stack

### 🧠 Backend
- Node.js + Express**
- TypeScript**
- MongoDB (Mongoose)**
- Socket.IO (Real-time WebSocket communication)**
- JWT Authentication**

### 🎯 Frontend
- Next.js (App Router
- TypeScript
- Tailwind CSS (pastel navy/dark theme
- Framer Motion (animations
- React Icons
- Leaflet.js (OpenStreetMap

---

## 🧾 Project Structure

```

/pages
├── api/
│   └── login.ts
├── customer/dashboard.tsx
├── delivery/dashboard.tsx
└── vendor/dashboard.tsx

/backend
├── server.ts
├── socket.ts
├── model/userModel.ts
└── utils/jwt.ts

/src
└── app/page.tsx

/utils
└── socket.ts

/components
├── MapTracker.tsx
└── AnimatedWrapper.tsx

/public
└── marker-icon.png





## 🚀 Running the Project

Open two terminals:

Terminal 1: Start the Backend
npx tsx backend/server.ts

Terminal 2: Start the Frontend
npm run dev


> Ensure MongoDB is running locally or via a service like MongoDB Atlas.

---

## 📦 Installation Guide

```bash
git clone https://github.com/your-username/locusx-real-time-tracker.git
cd locusx-real-time-tracker

# Install dependencies
npm install

# Create .env file
touch .env.local
```

### 🔐 `.env.local` Sample

```env
NEXT_PUBLIC_SOCKET_URL=http://localhost:4000
MONGODB_URI=mongodb://localhost:27017/your-db-name
JWT_SECRET=your_secret_key
```

---

## 🧪 Simulating Location Tracking

1. Log in as a delivery partner.
2. Click Fetch Orders to simulate order list.
3. Click Start Delivery → your geolocation is emitted every 2–3 seconds to the server.
4. Customer dashboard auto-updates the location using Socket.IO + Leaflet map.

---

## 🎨 UI/UX Highlights

Framer Motion** for smooth transitions.
Live Map with animated delivery marker.
Responsive design for all screens.

---

## 🧠 Architecture Overview

* REST APIs handle:

  * User auth
  * Order assignment
  * Location fetch on demand
* WebSockets handle:

  * Real-time communication for location updates
  * Room-based broadcasting per `orderId`

---

## 📃 License

MIT – Open for use and learning.

---

## 🙋‍♂️ Author

**Omkar** – [GitHub Profile](https://github.com/your-username)


