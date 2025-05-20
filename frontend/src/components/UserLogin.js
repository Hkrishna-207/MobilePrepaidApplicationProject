import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateMobile } from "../services/api";
import { FaMobileAlt } from "react-icons/fa";

const UserLogin = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const navigate = useNavigate();

  const handleMobileSubmit = async (e) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(mobileNumber)) {
      alert("Please enter a valid 10-digit mobile number");
      return;
    }

    try {
      const response = await validateMobile(mobileNumber);
      sessionStorage.setItem("mobileNumber", mobileNumber);
      sessionStorage.setItem("subscriber", JSON.stringify(response.data));
      sessionStorage.setItem("subscriberName", response.data.name);
      navigate("/recharge");
    } catch (error) {
      alert(error?.response?.data?.message || "Mobile number not found");
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
          <FaMobileAlt size={48} className="text-success mb-3" />
          <h5 className="fw-bold mb-3" style={{ color: "#10C88C" }}>
            User Login
          </h5>

          <form onSubmit={handleMobileSubmit}>
            <div className="mb-4 text-start">
              <label htmlFor="mobileNumber" className="form-label fw-semibold">
                Mobile Number
              </label>
              <input
                type="tel"
                id="mobileNumber"
                className="form-control"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                placeholder="Enter your 10-digit number"
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
              Verify & Continue
            </button>
          </form>

          <div className="text-center my-3 text-muted small">Not registered yet?</div>
          <button
            className="btn w-100 fw-semibold"
            onClick={() => navigate("/register")}
            style={{
              borderRadius: "50px",
              padding: "10px 24px",
              border: "2px solid #10C88C",
              backgroundColor: "transparent",
              color: "#10C88C",
              transition: "background-color 0.3s ease, color 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#10C88C";
              e.currentTarget.style.color = "white";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#10C88C";
            }}
          >
            Create New Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
