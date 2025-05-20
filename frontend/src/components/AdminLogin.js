import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../services/api";
import { FaUserShield } from "react-icons/fa";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      alert("Please enter both username and password");
      return;
    }

    try {
      const response = await loginAdmin(username, password);
      localStorage.setItem("adminToken", response.data.token);
      navigate("/admin-dashboard");
    } catch (error) {
      alert(error?.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div
      className="min-vh-100 d-flex flex-column"
      style={{
        background: "linear-gradient(to right, #e6fff5, #ffffff)", // soft green gradient same as home
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      {/* Header */}
      <header className="text-white py-3 px-4" style={{ backgroundColor: "#10C88C" }}>
        <h4 className="m-0 fw-bold">MobilePay</h4>
      </header>

      {/* Main Content */}
      <div className="flex-grow-1 d-flex justify-content-center align-items-center p-4">
        <div
          className="p-5 bg-white text-center shadow rounded-4"
          style={{ maxWidth: "420px", width: "100%" }}
        >
          <FaUserShield size={48} className="text-success mb-3" />
          <h5 className="fw-bold mb-3" style={{ color: "#10C88C" }}>
            Admin Login
          </h5>

          <form onSubmit={handleAdminSubmit} className="text-start">
            <div className="mb-4">
              <label htmlFor="username" className="form-label fw-semibold">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
                style={{ borderRadius: "12px" }}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="form-label fw-semibold">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                style={{ borderRadius: "12px" }}
              />
            </div>

            <button
              type="submit"
              className="btn w-100 fw-bold"
              style={{
                backgroundColor: "#10C88C",
                color: "white",
                borderRadius: "50px",
                padding: "10px 24px",
                transition: "background-color 0.3s ease",
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#0da770")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#10C88C")}
            >
              Login as Admin
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
