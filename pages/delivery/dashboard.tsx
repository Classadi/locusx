"use client";

import { useEffect, useState } from "react";
import socket from "../../backend/utils/socket";
import { motion, AnimatePresence } from "framer-motion";
import { FaMapMarkedAlt } from "react-icons/fa";
import Navbar from "@/app/components/Navbar";

const DeliveryDashboard = () => {
  const [orders, setOrders] = useState<string[]>([]);
  const [tracking, setTracking] = useState(false);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const orderId = "sample-order-id";

  useEffect(() => {
    if (!tracking) return;

    const emitLocation = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      setCoords({ lat: latitude, lng: longitude });

      socket.emit("send-location", {
        orderId,
        location: { lat: latitude, lng: longitude },
      });
    };

    const watchId = navigator.geolocation.watchPosition(emitLocation);
    return () => navigator.geolocation.clearWatch(watchId);
  }, [tracking, orderId]);

  const handleFetchOrders = () => {
    setOrders(["Order #1234", "Order #5678", "Order #9012"]);
  };

  const handleStartDelivery = () => {
    setTracking(true);
  };

  const styles = {
    container: {
      backgroundColor: "#0f172a",
      color: "white",
      minHeight: "100vh",
      paddingTop: "60px",
      fontFamily: "Times",
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
    },
    heading: {
      fontSize: "2rem",
      fontWeight: "bold",
      marginBottom: "2rem",
    },
    button: {
      backgroundColor: "transparent",
      color: "white",
      border: "solid 1px lime",
      borderRadius: "12px",
      padding: "0.75rem 1.5rem",
      margin: "0.5rem",
      fontSize: "1rem",
      cursor: "pointer",
      transition: "all 0.2s",
    },
    buttonHover: {
      backgroundColor: "#334155",
    },
    orderList: {
      backgroundColor: "#1e293b",
      borderRadius: "12px",
      padding: "1rem",
      marginTop: "1rem",
      color: "#e2e8f0",
      fontSize: "0.9rem",
      width: "100%",
      maxWidth: "400px",
    },
    gpsCard: {
      backgroundColor: "#1e293b",
      color: "#cbd5e1",
      borderRadius: "12px",
      padding: "1rem",
      marginTop: "1.5rem",
      textAlign: "center" as const,
      width: "100%",
      maxWidth: "400px",
    },
    gpsIcon: {
      fontSize: "2rem",
      color: "#10b981",
      marginBottom: "0.5rem",
      animation: "pulse 2s infinite",
    },
  };

  return (
    <div style={styles.container}>
      <Navbar>
        <h2
          className="cursor-pointer text-amber-50 hover:text-amber-300 transition-all text-[20px]"
          onClick={() => (window.location.href = "http://localhost:3000")}
        >
          Logout
        </h2>
      </Navbar>
      <motion.h1
        style={styles.heading}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Delivery Partner Dashboard
      </motion.h1>
      <hr style={{ width: "600px" }} />
      <br />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          width: "900px",
        }}
      >
        <div>
          <motion.button
            style={styles.button}
            whileHover={{
              scale: 1.05,
              backgroundColor: styles.buttonHover.backgroundColor,
            }}
            whileTap={{ scale: 0.95 }}
            onClick={handleFetchOrders}
          >
            Fetch Orders
          </motion.button>

          <AnimatePresence>
            {orders.length > 0 && (
              <motion.ul
                style={styles.orderList}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {orders.map((order, idx) => (
                  <li key={idx}>{order}</li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        <div>
          <motion.button
            style={{ ...styles.button, backgroundColor: "transparent" }}
            whileHover={{ scale: 1.05, backgroundColor: "#15803d" }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStartDelivery}
          >
            Start Delivery
          </motion.button>

          <AnimatePresence>
            {tracking && (
              <motion.div
                style={styles.gpsCard}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  style={styles.gpsIcon}
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  <FaMapMarkedAlt />
                </motion.div>
                <p>Tracking live location...</p>
                {coords && (
                  <div style={{ fontSize: "0.8rem", marginTop: "0.5rem" }}>
                    <p>Latitude: {coords.lat.toFixed(5)}</p>
                    <p>Longitude: {coords.lng.toFixed(5)}</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default DeliveryDashboard;
