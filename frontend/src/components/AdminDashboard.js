import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getExpiringSubscribers,
  getRechargeHistoryByMobile,
} from "../services/api";

const AdminDashboard = () => {
  const [expiringSubs, setExpiringSubs] = useState([]);
  const [mobile, setMobile] = useState("");
  const [rechargeHistory, setRechargeHistory] = useState([]);
  const [error, setError] = useState("");
  const [selectedMobile, setSelectedMobile] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getExpiringSubscribers()
      .then((res) => setExpiringSubs(res.data))
      .catch(() => setError("Failed to load expiring subscribers"));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setRechargeHistory([]);

    if (!/^\d{10}$/.test(mobile)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    fetchRechargeHistory(mobile);
  };

  const fetchRechargeHistory = (mobileNumber) => {
    getRechargeHistoryByMobile(mobileNumber)
      .then((res) => {
        setSelectedMobile(mobileNumber);
        if (res.data && res.data.length > 0) {
          setRechargeHistory(res.data);
        } else {
          setError("No recharge history found for this number.");
        }
      })
      .catch(() => setError("Failed to fetch recharge history."));
  };

  const handleLogout = () => {
    navigate("/login");
  };

  const getDaysRemaining = (expiryDateStr) => {
    const today = new Date();
    const expiry = new Date(expiryDateStr);
    const diff = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));

    if (diff < 0) return { label: "Expired", className: "bg-danger" };
    if (diff === 0) return { label: "Today", className: "bg-info text-dark" };
    return {
      label: `${diff} day${diff !== 1 ? "s" : ""}`,
      className: "bg-warning text-dark",
    };
  };

  return (
    <div
      className="min-vh-100 d-flex flex-column"
      style={{
        background: "linear-gradient(to right, #e6fff5, #ffffff)",
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      {/* Header */}
      <header
        className="d-flex justify-content-between align-items-center px-4 py-3"
        style={{ backgroundColor: "#10C88C", borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }}
      >
        <h2 className="m-0 fw-bold text-white">Admin Dashboard</h2>
        <div className="d-flex align-items-center gap-3">
          <span className="fw-semibold text-white">Welcome, Admin</span>
          <button
            className="btn btn-outline-light rounded-pill"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="container py-5 flex-grow-1">
        {/* Expiring Plans Card */}
        <section
          className="bg-white shadow-sm rounded-4 p-4 mb-5"
          style={{ maxWidth: "900px", margin: "0 auto" }}
        >
          <h4 className="fw-semibold mb-2 text-success">Subscribers with Expiring Plans</h4>
          <p className="text-muted small mb-4">
            Showing plans expiring within the next 3 days
          </p>

          {error && <div className="alert alert-danger">{error}</div>}

          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Name</th>
                  <th>Mobile</th>
                  <th>Email</th>
                  <th>Expires In</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {expiringSubs.length > 0 ? (
                  expiringSubs.map((sub) => {
                    const badge = getDaysRemaining(sub.planExpiry);
                    return (
                      <tr key={sub.mobileNumber}>
                        <td>{sub.name}</td>
                        <td>{sub.mobileNumber}</td>
                        <td>{sub.email}</td>
                        <td>
                          <span className={`badge ${badge.className}`}>
                            {badge.label}
                          </span>
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-outline-success rounded-pill"
                            onClick={() =>
                              fetchRechargeHistory(sub.mobileNumber)
                            }
                          >
                            View History
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-muted">
                      No expiring subscribers found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Search Recharge History Card */}
        {/* Search Recharge History Card */}
<section
  className="bg-white shadow-sm rounded-4 p-4 mb-5"
  style={{ maxWidth: "600px", margin: "0 auto" }}
>
  <h4 className="fw-semibold mb-3 text-success">Search Recharge History</h4>
  <form onSubmit={handleSubmit}>
    <div className="input-group input-group-lg mb-3">
      <input
        type="text"
        className="form-control rounded-pill"
        placeholder="Enter mobile number"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />
      <button
        type="submit"
        className="btn btn-success rounded-pill mt-3"
        style={{ letterSpacing: "0.05em" }}
      >
        View History
      </button>
    </div>
  </form>
</section>


        {/* Recharge History Table */}
        {rechargeHistory.length > 0 && (
          <section
            className="bg-white shadow-sm rounded-4 p-4"
            style={{ maxWidth: "900px", margin: "0 auto" }}
          >
            <h5 className="fw-bold mb-3 text-success">
              Recharge History for {selectedMobile}
            </h5>
            <div className="table-responsive">
              <table className="table table-bordered table-striped table-sm">
                <thead className="table-light">
                  <tr>
                    <th>Date</th>
                    <th>Plan</th>
                    <th>Amount</th>
                    <th>Payment</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {rechargeHistory.map((r, i) => (
                    <tr key={i}>
                      <td>{new Date(r.rechargeDate).toLocaleString()}</td>
                      <td>{r.plan.name}</td>
                      <td>₹{r.amount}</td>
                      <td>{r.paymentMethod}</td>
                      <td>
                        <span className="badge bg-success text-capitalize">
                          {r.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center py-3 text-muted small">
        &copy; {new Date().getFullYear()} MobilePay. All rights reserved.
      </footer>
    </div>
  );
};

export default AdminDashboard;
