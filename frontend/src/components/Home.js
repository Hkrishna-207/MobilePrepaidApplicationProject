import React from 'react';
import { useNavigate } from 'react-router-dom';
import {FaRupeeSign } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const navigate = useNavigate();

  return (
    <div className="min-vh-100 d-flex flex-column" style={{ backgroundColor: '#f4f4f4' }}>
      
      {/* Navbar */}
      <nav
      className="d-flex justify-content-between align-items-center px-4 py-2"
      style={{
        backgroundColor: '#10C88C',
        color: 'white',
        borderBottomLeftRadius: '10px',
        borderBottomRightRadius: '10px',
      }}
    >
      {/* Left - Brand */}
      <h4 className="fw-bold m-0">MobilePay</h4>

      {/* Right - Buttons */}
      <div className="d-flex align-items-center gap-2 ms-auto">
        <button
          className="btn btn-success rounded-pill px-4"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
        <button
          className="btn btn-outline-light rounded-pill px-4"
          onClick={() => navigate("/register")}
        >
          SignUp
        </button>
      </div>
    </nav>



      {/* Hero Section */}
      <div
        className="flex-grow-1 d-flex flex-column justify-content-center align-items-center text-center px-4"
        style={{
          background: 'linear-gradient(135deg, #f4f4f4, #ffffff)',
          padding: '2rem 0',
        }}
      >
        <h1 className="fw-bold mb-3" style={{ color: '#333' }}>
          Welcome to MobilePay
        </h1>
        <p className="text-muted mb-4" style={{ maxWidth: '600px' }}>
          MobilePay is your one-stop platform for secure and easy prepaid mobile recharges.
          Whether you're a subscriber or an admin, enjoy seamless access, real-time plans,
          and fast transactions.
        </p>

        {/* Action Card */}
        <div
          className="bg-white text-dark p-4 rounded-4 shadow"
          style={{ maxWidth: '420px', width: '100%' }}
        >
          <div className="text-success mb-3 text-center">
            <FaRupeeSign size={32} />
          </div>
          <h3 className="fw-bold text-center mb-2">Start Recharging</h3>
          <p className="text-muted text-center mb-4">Choose an option to begin</p>

          <div className="d-flex justify-content-center gap-3">
            
            <button
              className="btn btn-outline-success rounded-pill px-4"
              onClick={() => navigate("/user-login")}
            >
              Recharge
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-3 text-muted small">
        &copy; {new Date().getFullYear()} MobilePay. All rights reserved.
      </footer>
    </div>
  );
};

export default App;
