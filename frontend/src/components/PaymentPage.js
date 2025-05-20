import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { rechargeUser } from '../services/api';

export default function PaymentPage() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [plan, setPlan] = useState(null);
  const [mobileNumber, setMobileNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const storedPlan = sessionStorage.getItem("selectedPlan");
    const storedMobile = sessionStorage.getItem("mobileNumber");

    if (storedPlan) {
      setPlan(JSON.parse(storedPlan));
    } else {
      navigate("/recharge");
    }

    if (storedMobile) {
      setMobileNumber(storedMobile);
    } else {
      alert("Mobile number missing. Please login again.");
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/login');
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    const paymentDetails =
      paymentMethod === 'upi'
        ? upiId
        : `${cardNumber}|${expiry}|${cvv}`;

    try {
      const response = await rechargeUser(
        mobileNumber,
        plan.id,
        paymentMethod.toUpperCase(),
        paymentDetails
      );

      if (response.status === 200 && response.data.transactionId) {
        sessionStorage.setItem("paymentStatus", "success");
        sessionStorage.setItem("transactionId", response.data.transactionId);
        navigate('/recharge-success');
      } else {
        throw new Error("Unexpected response.");
      }
    } catch (error) {
      alert("Payment failed: " + (error.response?.data || error.message));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!plan) {
    return <div className="text-center mt-5 text-muted">Loading plan details...</div>;
  }

  return (
    <div className="min-vh-100 d-flex flex-column" style={{ backgroundColor: "#f4f4f4" }}>
      {/* Header */}
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
        <button className="btn btn-outline-light rounded-pill btn-sm" onClick={handleLogout}>
          Logout
        </button>
      </nav>

      {/* Payment Card */}
      <div className="container py-5 flex-grow-1 d-flex justify-content-center align-items-center">
        <div className="bg-white rounded-4 shadow-sm p-4 w-100" style={{ maxWidth: "500px" }}>
          <h4 className="text-center mb-4 text-success fw-bold">Complete Your Payment</h4>

          {/* Plan Summary */}
          <div className="mb-3 text-muted small">
            <p><strong>Plan:</strong> {plan.name}</p>
            <p><strong>Price:</strong> ₹{plan.price}</p>
            <p><strong>Validity:</strong> {plan.validityDays} days</p>
            <p><strong>Data:</strong> {plan.data}</p>
            <p><strong>Calls:</strong> {plan.calls}</p>
            <p><strong>SMS:</strong> {plan.sms}</p>
          </div>

          {/* Payment Method Switch */}
          <div className="d-flex mb-3 gap-2">
            {['upi', 'credit'].map((method) => (
              <button
                key={method}
                type="button"
                className={`btn w-50 rounded-pill ${
                  paymentMethod === method ? 'btn-success text-white' : 'btn-outline-success'
                }`}
                onClick={() => setPaymentMethod(method)}
              >
                {method === 'upi' ? 'UPI' : 'Credit Card'}
              </button>
            ))}
          </div>

          {/* Payment Form */}
          <form onSubmit={handlePayment}>
            {paymentMethod === 'upi' && (
              <div className="mb-3">
                <label className="form-label">UPI ID</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="yourname@upi"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  required
                />
              </div>
            )}

            {paymentMethod === 'credit' && (
              <>
                <div className="mb-3">
                  <label className="form-label">Card Number</label>
                  <input
                    type="text"
                    className="form-control"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    required
                  />
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <label className="form-label">Expiry</label>
                    <input
                      type="text"
                      className="form-control"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col">
                    <label className="form-label">CVV</label>
                    <input
                      type="password"
                      className="form-control"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </>
            )}

            <button
              type="submit"
              className="btn btn-success w-100 rounded-pill"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : `Pay ₹${plan.price}`}
            </button>
          </form>

          <p className="text-muted text-center small mt-3">
            Recharge activates instantly after payment.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-3 text-muted small">
        &copy; {new Date().getFullYear()} MobilePay. All rights reserved.
      </footer>
    </div>
  );
}
