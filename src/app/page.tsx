"use client";
import Image from "next/image";
import Navbar from "./components/Navbar";
import Login from "./login/page";
import { useRef, useState } from "react";
import styles from "./Home.module.css";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Home() {
  const [isSignIn, setIsSignIn] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setIsSignIn(false);
    }
  };

  return (
    <div className={styles.container}>
      <Navbar>
        <h2 className={styles.loginText} onClick={() => setIsSignIn(true)}>
          Login
        </h2>
      </Navbar>

      {isSignIn && (
        <div className={styles.modalOverlay} onClick={handleOutsideClick}>
          <div ref={modalRef}>
            <Login />
          </div>
        </div>
      )}

      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
      >
        <source src="/trackerbg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <footer
        style={{
          backgroundColor: "#1a1a1a",
          color: "#cccccc",
          padding: "2rem 1rem",
          marginTop: "700px",
          width: "100%",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Brand */}
          <div style={{ textAlign: "center", marginBottom: "1rem" }}>
            <h2
              style={{
                fontFamily: "Times",
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "#ffffff",
              }}
            >
              locusX
            </h2>
            <p style={{ fontSize: "0.9rem", color: "#888888" }}>
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>

          {/* Links */}
          <div style={{ display: "flex", gap: "1.5rem", marginBottom: "1rem" }}>
            <a
              href="/vendor/dashboard"
              style={{ color: "#cccccc", textDecoration: "none" }}
            >
              Vendor
            </a>
            <a
              href="/delivery/dashboard"
              style={{ color: "#cccccc", textDecoration: "none" }}
            >
              Delivery
            </a>
            <a
              href="/login"
              style={{ color: "#cccccc", textDecoration: "none" }}
            >
              Login
            </a>
          </div>

          {/* Socials */}
          <div style={{ display: "flex", gap: "1rem" }}>
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#cccccc" }}
            >
              <FaGithub size={40} />
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#cccccc" }}
            >
              <FaLinkedin size={40} />
            </a>
            <a
              href="https://twitter.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#cccccc" }}
            >
              <FaTwitter size={40} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
