"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Login.module.css"; // CSS module remains the same

export default function Login() {
  const router = useRouter();

  const roles = ["vendor", "customer", "delivery"];
  const roleLabels: { [key: string]: string } = {
    vendor: "Vendor",
    customer: "Customer",
    delivery: "Delivery Partner",
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [mode, setMode] = useState<"login" | "register">("login");

  const role = roles[roleIndex];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === "register" && password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const endpoint = mode === "login" ? "/api/login" : "/api/register";

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role }),
    });

    if (res.ok) {
      router.push(
        role === "vendor"
          ? "/vendor/dashboard"
          : role === "delivery"
          ? "/delivery/dashboard"
          : "/customer/dashboard"
      );
    } else {
      alert(`${mode === "login" ? "Login" : "Registration"} failed`);
    }
  };

  const handleRoleChange = (direction: "next" | "prev") => {
    setRoleIndex((prevIndex) =>
      direction === "next"
        ? (prevIndex + 1) % roles.length
        : (prevIndex - 1 + roles.length) % roles.length
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`${styles.container} ${
        mode === "register" ? styles.darkOcean : ""
      }`}
    >
      <div className={styles.roleSwitcher}>
        <button
          onClick={() => handleRoleChange("prev")}
          className={styles.switchButton}
        >
          ◃
        </button>

        <AnimatePresence mode="wait">
          <motion.h2
            key={`${role}-${mode}`}
            className={styles.roleTitle}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
          >
            {roleLabels[role]} {mode === "login" ? "Login" : "Register"}
          </motion.h2>
        </AnimatePresence>

        <button
          onClick={() => handleRoleChange("next")}
          className={styles.switchButton}
        >
          ▹
        </button>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <h4>Email</h4>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />
        </div>

        <div>
          <h4>Password</h4>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
          />
        </div>

        {mode === "register" && (
          <div>
            <h4>Confirm Password</h4>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className={styles.input}
            />
          </div>
        )}

        <div className={styles.buttonRow}>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className={styles.button}
          >
            {mode === "login" ? "Login" : "Register"}
          </motion.button>

          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={styles.button}
            onClick={() =>
              setMode((prev) => (prev === "login" ? "register" : "login"))
            }
          >
            {mode === "login" ? "Register" : "Back to Login"}
          </motion.div>
        </div>
      </form>
    </motion.div>
  );
}
