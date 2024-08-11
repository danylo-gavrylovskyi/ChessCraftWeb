import React, { useState } from "react";
import styles from "./AuthPopup.module.css";

interface PopupProps {
  type: "login" | "register";
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ type, onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const handleLogin = async () => {
    const url = `${backendUrl}/api/users/login`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("token", data.token);
      onClose();
    } else {
      alert(data.message);
    }
  };

  const handleRegister = async () => {
    const response = await fetch(`${backendUrl}/api/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Registration successful! Please login.");
      onClose();
    } else {
      alert(data.message);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <h2>{type === "login" ? "Login" : "Register"}</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={type === "login" ? handleLogin : handleRegister}>
          {type === "login" ? "Login" : "Register"}
        </button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Popup;
