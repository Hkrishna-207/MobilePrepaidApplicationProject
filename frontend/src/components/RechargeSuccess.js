import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RechargeSuccess = () => {
  const navigate = useNavigate();
  const [plan, setPlan] = useState(null);
  const [transactionId, setTransactionId] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  useEffect(() => {
    const status = sessionStorage.getItem('paymentStatus');
    const planData = sessionStorage.getItem('selectedPlan');
    const txnId = sessionStorage.getItem('transactionId');
    const mobile = sessionStorage.getItem('mobileNumber');

    if (status !== 'success' || !planData || !txnId || !mobile) {
      navigate('/recharge');
      return;
    }

    setPlan(JSON.parse(planData));
    setTransactionId(txnId);
    setMobileNumber(mobile);
  }, [navigate]);

  if (!plan) return <div className="text-center mt-5 text-dark">Loading...</div>;

  return (
    <div
      className="min-vh-100 d-flex flex-column"
      style={{
        background: 'linear-gradient(to right, #e6fff5, #ffffff)',
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      {/* Header */}
      <header
        className="d-flex justify-content-between align-items-center py-3 px-4"
        style={{ backgroundColor: '#10C88C' }}
      >
        <h4 className="m-0 fw-bold text-white">MobilePay</h4>
        <button
          className="btn btn-outline-light rounded-pill"
          style={{ fontWeight: 'bold' }}
          onClick={() => navigate('/login')}
        >
          Logout
        </button>
      </header>

      {/* Main content */}
      <main className="flex-grow-1 d-flex flex-column justify-content-center align-items-center p-4">
        <div
          className="bg-white shadow rounded-4 p-4 text-center"
          style={{ maxWidth: '480px', width: '100%' }}
        >
          <h1 className="fw-bold text-success mb-3">Recharge Successful</h1>

          <p className="text-muted mb-3">
            Your mobile number <strong>{mobileNumber}</strong> has been successfully recharged with plan <strong>{plan.name}</strong>.
          </p>

          <div className="mb-2">
            <span className="text-muted small">Transaction ID:</span><br />
            <strong>{transactionId}</strong>
          </div>

          <div className="mb-2">
            <span className="text-muted small">Plan Name:</span><br />
            <strong>{plan.name}</strong>
          </div>

          <div className="mb-4">
            <span className="text-muted small">Amount:</span><br />
            <strong>₹{plan.price}</strong>
          </div>

          <p className="text-muted small mb-4">
            A confirmation email has been sent to your registered address.
          </p>

          <button
            className="btn"
            style={{ backgroundColor: '#10C88C', color: 'white', borderRadius: '50px', padding: '0.5rem 1.5rem', fontWeight: '600' }}
            onClick={() => navigate('/recharge')}
          >
            Go to Dashboard
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-3 text-muted small">
        &copy; {new Date().getFullYear()} MobilePay. All rights reserved.
      </footer>
    </div>
  );
};

export default RechargeSuccess;
