import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPlans, validateMobile, registerSubscriber } from "../services/api";
import { FaSearch, FaSignOutAlt } from "react-icons/fa";

export default function RechargeInterface() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All Plans");
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [subscriberName, setSubscriberName] = useState("");
  const [searchPrice, setSearchPrice] = useState("");

  const mobileNumber = sessionStorage.getItem("mobileNumber");

  useEffect(() => {
    if (!mobileNumber) {
      alert("Session expired. Please login again.");
      navigate("/login");
    } else {
      const name = sessionStorage.getItem("subscriberName");
      if (name) setSubscriberName(name);
    }
  }, [mobileNumber, navigate]);

  useEffect(() => {
    getPlans()
      .then((response) => setPlans(response.data))
      .catch((error) => console.error("Error fetching plans:", error));
  }, []);

  const tabs = ["All Plans", "Popular", "Validity", "Data", "Unlimited", "Special"];

  const filteredPlans = searchPrice
    ? plans.filter((plan) => plan.price.toString() === searchPrice.trim())
    : activeTab === "All Plans"
      ? plans
      : plans.filter((plan) => plan.category.toLowerCase() === activeTab.toLowerCase());

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  const PlanCard = ({ plan }) => (
    <div className="bg-white rounded-4 shadow-sm p-3 mb-3">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="mb-0 text-success fw-bold">₹{plan.price}</h5>
        <span className="text-muted small">{plan.validityDays} days</span>
      </div>
      <p className="mb-1 text-muted">{plan.name}</p>
      <div className="small mb-3">
        <strong>Data:</strong> {plan.data} | <strong>Calls:</strong> {plan.calls} | <strong>SMS:</strong> {plan.sms}
      </div>
      <button
        className="btn btn-success rounded-pill w-100"
        disabled={loading}
        onClick={async () => {
          if (!mobileNumber) {
            alert("Mobile number not found. Please login again.");
            navigate("/login");
            return;
          }

          setLoading(true);
          try {
            await validateMobile(mobileNumber);
          } catch (error) {
            if (error.response?.status === 404) {
              const name = prompt("Enter your name to register:");
              const email = prompt("Enter your email:");
              if (!name || !email) {
                alert("Name and Email are required.");
                setLoading(false);
                return;
              }
              try {
                await registerSubscriber(mobileNumber, name.trim(), email.trim());
                alert("Subscriber registered successfully.");
              } catch (regError) {
                alert("Registration failed: " + (regError.response?.data || regError.message));
                setLoading(false);
                return;
              }
            } else {
              alert("Error validating mobile number: " + (error.message || "Unknown error"));
              setLoading(false);
              return;
            }
          }

          sessionStorage.setItem("selectedPlan", JSON.stringify(plan));
          navigate("/payment");
        }}
      >
        {loading ? "Processing..." : "Select Plan"}
      </button>
    </div>
  );

  return (
    <div className="min-vh-100 d-flex flex-column" style={{ backgroundColor: "#f4f4f4" }}>
      {/* Navbar */}
      <nav
        className="d-flex justify-content-between align-items-center px-4 py-2"
        style={{
          backgroundColor: "#10C88C",
          color: "white",
          borderBottomLeftRadius: "10px",
          borderBottomRightRadius: "10px",
        }}
      >
        <h4 className="fw-bold m-0">MobilePay</h4>
        <div className="d-flex align-items-center gap-3">
          <span className="fw-semibold">Hi, {subscriberName || mobileNumber}</span>
          <button className="btn btn-outline-light rounded-pill btn-sm" onClick={handleLogout}>
            <FaSignOutAlt className="me-1" />
            Logout
          </button>
        </div>
      </nav>

      {/* Content */}
      <div className="container-fluid py-4 flex-grow-1">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3 mb-3">
            <div className="bg-white p-3 rounded-4 shadow-sm mb-4">
              <h6 className="fw-bold text-muted">Your Number</h6>
              <div className="d-flex justify-content-between align-items-center">
                <strong>{mobileNumber}</strong>
                <button className="btn btn-sm btn-outline-success rounded-pill" onClick={() => navigate("/login")}>
                  Change
                </button>
              </div>
            </div>

            <div className="bg-white p-3 rounded-4 shadow-sm">
              <h6 className="fw-bold text-muted">Search Pack</h6>
              <div className="input-group">
                <input
                  type="number"
                  className="form-control rounded-start-pill"
                  placeholder="Enter price (e.g. 199)"
                  value={searchPrice}
                  onChange={(e) => setSearchPrice(e.target.value)}
                />
                <span className="input-group-text bg-white border-start-0 rounded-end-pill">
                  <FaSearch />
                </span>
              </div>
            </div>
          </div>

          {/* Plans */}
          <div className="col-md-9">
            {/* Colored Tabs */}
            <div className="d-flex flex-wrap gap-2 mb-3">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={`btn rounded-pill flex-grow-1 text-nowrap ${
                    activeTab === tab ? "btn-success text-white" : "btn-outline-success"
                  }`}
                  style={{ minWidth: "120px" }}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Plan List */}
            <div style={{ maxHeight: "520px", overflowY: "auto", paddingRight: "10px" }}>
              {filteredPlans.length > 0 ? (
                filteredPlans.map((plan) => <PlanCard key={plan.id} plan={plan} />)
              ) : (
                <div className="text-muted text-center">No plans found</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-3 text-muted small">
        &copy; {new Date().getFullYear()} MobilePay. All rights reserved.
      </footer>
    </div>
  );
}
