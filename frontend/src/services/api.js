import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Automatically attach JWT if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ==================== Admin APIs ====================

// Admin login
export const loginAdmin = (username, password) => {
  return api.post("/auth/admin/login", { username, password });
};

// Register a new subscriber
export const registerSubscriber = (mobileNumber, name, email) => {
  return api.post("/auth/subscriber/register", { mobileNumber, name, email });
};

// Validate a mobile number (for login or signup)
export const validateMobile = (mobileNumber) => {
  return api.post("/auth/validate-mobile", { mobileNumber });
};

// Get expiring subscribers (admin only)
export const getExpiringSubscribers = () => {
  return api.get("/admin/subscribers/expiring");
};

// Get recharge history of a subscriber (admin only)
export const getRechargeHistoryByMobile = (mobileNumber) => {
  return api.get(`/admin/subscribers/${mobileNumber}/history`);
};

// ==================== User APIs ====================

// Fetch available recharge plans
export const getPlans = () => {
  return api.get("/user/plans");
};

// Submit a recharge request
export const rechargeUser = (mobileNumber, planId, paymentMethod, paymentDetails) => {
  return api.post("/user/recharge", {
    mobileNumber,
    planId,
    paymentMethod,
    paymentDetails
  });
};

export default api;
