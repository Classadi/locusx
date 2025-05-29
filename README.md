# locusX:  Real-Time Location Tracker for Multivendor Delivery Platform
![landingpg](https://github.com/user-attachments/assets/f3be224a-23a8-491c-9ede-0749ae8f4746)


This is a full-stack web application inspired by Rapido/Dunzo that enables real-time location tracking of delivery partners within a multivendor marketplace. Vendors can assign delivery partners to orders, delivery partners can share live location, and customers can track them on a map that auto-updates every 2–3 seconds.
website deployed at: https://locusx.vercel.app/

Role: Vendor
Sample Email: vendor@example.com
Password: vendor123

Role: Delivery
Sample Email: delivery@example.com
Password: delivery123

Role: Customer
Sample Email: customer@example.com
Password: customer123

---

## 📌 Features

### 🔐 Authentication
- JWT-based login/signup for vendors, delivery partners, and customers.
- Session persistence using secure tokens.

### 🧑‍💼 Vendor Dashboard
![vendor](https://github.com/user-attachments/assets/b299b88f-23e8-46ca-8ad1-a4d40c33c7df)

- View list of orders.
- Assign delivery partners to orders.

### 🛵 Delivery Partner Dashboard
![delivery](https://github.com/user-attachments/assets/6e7bef17-303b-4c31-96a6-5090d5f07587)


- View assigned orders.
- Start delivery tracking — sends live geolocation every 2–3 seconds.
- Animated GPS feedback using Framer Motion.

### 👤 Customer Dashboard
![customer](https://github.com/user-attachments/assets/2743f2f8-f910-4144-92e1-8b64d5cd33e3)


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
```
locusx/
├── pages/
│ ├── api/
│ │ └── login.ts
│ ├── customer/
│ │ └── dashboard.tsx
│ ├── delivery/
│ │ └── dashboard.tsx
│ └── vendor/
│ └── dashboard.tsx

├── backend/
│ ├── server.ts
│ ├── socket.ts
│ ├── model/
│ │ └── userModel.ts
│ └── utils/
│ └── jwt.ts

├── src/
│ └── app/
│ └── page.tsx
│
├── utils/
│ └── socket.ts

```

## 🚀 Running the Project

Open two terminals:

Terminal 1: Start the Backend:
```bash
npx tsx backend/server.ts
```
Terminal 2: Start the Frontend
```bash
npm run dev
```

> Ensure MongoDB is running locally or via a service like MongoDB Atlas.

---

## 📦 Installation Guide
```bash
git clone https://github.com/your-username/locusx-real-time-tracker.git
cd locusx-real-time-tracker
```
# Install dependencies
```bash
npm install
```
# Create .env file
```bash
touch .env.local
```
### 🔐 `.env.local` Sample

.env
NEXT_PUBLIC_SOCKET_URL=http://localhost:4000
MONGODB_URI=mongodb://localhost:27017/your-db-name
JWT_SECRET=your_secret_key


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

## 🙋‍♂️ Author

**Omkar** – [GitHub Profile](https://github.com/your-username)


