"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import socket from "../../backend/utils/socket";
import Navbar from "@/app/components/Navbar";

const MapTracker = dynamic(() => import("@/app/components/MapTracker"), {
  ssr: false,
});

const STORES = [
  {
    city: "Surat",
    place: "VR Surat Mall",
    coords: { lat: 21.1702, lng: 72.8311 },
  },
  {
    city: "Delhi",
    place: "Select CITYWALK, Saket",
    coords: { lat: 28.5286, lng: 77.219 },
  },
  {
    city: "Mumbai",
    place: "High Street Phoenix, Lower Parel",
    coords: { lat: 18.9946, lng: 72.8256 },
  },
  {
    city: "Bangalore",
    place: "Orion Mall, Rajajinagar",
    coords: { lat: 13.011, lng: 77.5565 },
  },
  {
    city: "Chennai",
    place: "Express Avenue Mall, Royapettah",
    coords: { lat: 13.0604, lng: 80.2686 },
  },
];

// Helper to fetch route from OSRM API (returns array of {lat,lng})
async function fetchRoute(
  source: { lat: number; lng: number },
  dest: { lat: number; lng: number }
): Promise<{ lat: number; lng: number }[]> {
  const url = `https://router.project-osrm.org/route/v1/driving/${source.lng},${source.lat};${dest.lng},${dest.lat}?geometries=geojson`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch route");
  const data = await res.json();
  const coords: [number, number][] = data.routes[0].geometry.coordinates; // [lng, lat] pairs

  // Convert to {lat, lng} array
  return coords.map(([lng, lat]) => ({ lat, lng }));
}

export default function CustomerDashboard() {
  const [orderId, setOrderId] = useState("");
  const [tracking, setTracking] = useState(false);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [orderLocation, setOrderLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [source, setSource] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [route, setRoute] = useState<{ lat: number; lng: number }[]>([]);
  const [routeIndex, setRouteIndex] = useState(0);

  // Get user location once on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        (err) => console.error("Geolocation error:", err)
      );
    }
  }, []);

  // When userLocation available and tracking started, pick a source and fetch route
  useEffect(() => {
    if (tracking && userLocation) {
      // Pick random source from static stores
      const selectedStore = STORES[Math.floor(Math.random() * STORES.length)];
      setSource(selectedStore.coords);

      // Fetch route from source to user
      fetchRoute(selectedStore.coords, userLocation)
        .then((r) => {
          setRoute(r);
          setRouteIndex(0);
          setOrderLocation(r[0]); // Start order at first point of route (source)
        })
        .catch((err) => {
          console.error("Route fetch error:", err);
          setRoute([]);
          setOrderLocation(null);
        });
    }
  }, [tracking, userLocation]);

  // Animate order moving along route points
  useEffect(() => {
    if (tracking && route.length > 0) {
      const interval = setInterval(() => {
        setRouteIndex((idx) => {
          if (idx >= route.length - 1) {
            clearInterval(interval);
            return idx;
          }
          setOrderLocation(route[idx + 1]);
          return idx + 1;
        });
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [tracking, route]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#010e21",
      }}
    >
      <Navbar />
      <div className="w-full py-10 text-center pt-[35px]">
        <h1
          className="text-[50px] text-[#8ad6ff] mb-[5px]"
          style={{ fontWeight: "bolder", fontFamily: "Roboto" }}
        >
          Track Your Delivery
        </h1>
        <div className="flex justify-center items-center space-x-reverse">
          <input
            type="text"
            placeholder="Enter Order ID"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="p-[10px] w-[300px] rounded-[50px] border border-[gray]  focus:outline-none focus:ring-2 mb-[10px] "
          />
          <button
            onClick={() => {
              if (orderId.trim() && userLocation) {
                socket.emit("join-order", orderId);
                setTracking(true);
              }
            }}
            className="px-[8px] py-[5px] h-[50px] text-[20px] w-[100px] bg-[black] text-[white] font-semibold rounded-full shadow-lg hover:bg-[#282828] transition-all mx-[20px] my-[8px]"
          >
            Track
          </button>
        </div>
      </div>

      {tracking &&
        userLocation &&
        orderLocation &&
        source &&
        route.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              width: "100%",
              maxWidth: "72rem",
              paddingLeft: "1rem",
              paddingRight: "1rem",
              marginBottom: "2.5rem",
              borderRadius: "50px",
            }}
          >
            <MapTracker
              userLocation={userLocation}
              orderLocation={orderLocation}
              source={source}
              route={route}
              orderid={orderId}
            />
          </motion.div>
        )}
    </div>
  );
}
