import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerSubscriber } from "../services/api";

export default function SubscriberRegistration() {
  const [formData, setFormData] = useState({
    mobileNumber: "",
    name: "",
    email: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^\d{10}$/.test(formData.mobileNumber)) {
      setError("Mobile number must be exactly 10 digits.");
      return;
    }
    if (!formData.name.trim()) {
      setError("Name is required.");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setError("Valid email is required.");
      return;
    }

    try {
      await registerSubscriber(
        formData.mobileNumber,
        formData.name,
        formData.email
      );

      alert("Registration successful! Please login.");

      navigate("/user-login");
    } catch (err) {
      setError(
        err.response?.data || "Registration failed. Please try again later."
      );
    }
  };

  return (
    <div
      className="min-vh-100 d-flex flex-column"
      style={{
        background: "linear-gradient(to right, #e6fff5, #ffffff)",
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      {/* Navbar/Header */}
      <header
        className="text-white py-3 px-4 shadow-sm"
        style={{
          backgroundColor: "#10C88C",
        }}
      >
        <h4 className="m-0 fw-bold">MobilePay</h4>
      </header>

      {/* Main Content */}
      <div className="flex-grow-1 d-flex justify-content-center align-items-center p-4">
        <div
          className="bg-white shadow rounded-4 p-4 w-100 animate__animated animate__fadeIn"
          style={{ maxWidth: "420px" }}
        >
          <h4
            className="text-center fw-bold mb-4"
            style={{ color: "#10C88C" }}
          >
            Subscriber Registration
          </h4>

          {error && (
            <div className="alert alert-danger text-center py-2">{error}</div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label htmlFor="mobileNumber" className="form-label fw-semibold">
                Mobile Number
              </label>
              <input
                type="tel"
                id="mobileNumber"
                name="mobileNumber"
                className="form-control rounded-pill"
                value={formData.mobileNumber}
                onChange={handleChange}
                placeholder="Enter 10-digit mobile number"
                maxLength={10}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="name" className="form-label fw-semibold">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control rounded-pill"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-semibold">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control rounded-pill"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                required
              />
            </div>

            <button
              type="submit"
              className="btn w-100 mt-3"
              style={{
                backgroundColor: "#10C88C",
                color: "#fff",
                border: "none",
                borderRadius: "50px",
                padding: "0.6rem",
                fontWeight: "600",
              }}
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
