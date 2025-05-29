"use client";

import { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import markerImg from "../../../public/marker.png";
import srcImg from "../../../public/sourceMarker.png";
// Icons
const orderIcon = new L.Icon({
  iconUrl: markerImg.src,
  iconSize: [40, 40],
  iconAnchor: [12, 41],
});

const srcIcon = new L.Icon({
  iconUrl: srcImg.src,
  iconSize: [45, 45],
  iconAnchor: [12, 41],
});

const userIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
  iconSize: [35, 35],
  iconAnchor: [17, 35],
});

// Fit map bounds
function FitMapBounds({ points }: { points: LatLngExpression[] }) {
  const map = useMap();
  useEffect(() => {
    const bounds = L.latLngBounds(points);
    map.fitBounds(bounds, { padding: [50, 50] });
  }, [map, points]);

  return null;
}

export default function MapTracker({
  userLocation,
  orderLocation,
  source,
  route,
  orderid,
}: {
  userLocation: { lat: number; lng: number };
  orderLocation: { lat: number; lng: number };
  source: { lat: number; lng: number };
  route: { lat: number; lng: number }[];
  orderid: string;
}) {
  const fitPoints = [userLocation, orderLocation, source, ...(route || [])];

  return (
    <MapContainer
      center={userLocation}
      zoom={8}
      scrollWheelZoom={false}
      className="h-[80vh] w-full rounded-xl shadow-xl z-10"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Fit bounds to route + markers */}
      <FitMapBounds points={fitPoints} />

      {/* Route polyline */}
      {route && route.length > 1 && (
        <Polyline
          positions={route}
          pathOptions={{ color: "navy", weight: 2 }}
        />
      )}

      {/* Order marker */}
      <Marker position={orderLocation} icon={orderIcon}>
        <Popup>
          🛵 Order is here <br /> 📦 Order ID: {orderid}
        </Popup>
      </Marker>

      {/* Source */}
      <Marker position={source} icon={srcIcon}>
        <Popup>🏬 Order source</Popup>
      </Marker>

      {/* User marker */}
      <Marker position={userLocation} icon={userIcon}>
        <Popup>📍 Your location</Popup>
      </Marker>
    </MapContainer>
  );
}
