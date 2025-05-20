// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { loginAdmin, validateMobile } from "../services/api";

// const Login = () => {
//   const [mobileNumber, setMobileNumber] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [activeTab, setActiveTab] = useState("mobile");
//   const navigate = useNavigate();

//   const handleMobileSubmit = async (e) => {
//     e.preventDefault();
//     if (!/^\d{10}$/.test(mobileNumber)) {
//       alert("Please enter a valid 10-digit mobile number");
//       return;
//     }

//     try {
//       const response = await validateMobile(mobileNumber);
//       sessionStorage.setItem("mobileNumber", mobileNumber);
//       sessionStorage.setItem("subscriber", JSON.stringify(response.data));
//       sessionStorage.setItem("subscriberName", response.data.name);
//       navigate("/recharge");
//     } catch (error) {
//       alert(error?.response?.data?.message || "Mobile number not found");
//     }
//   };

//   const handleAdminSubmit = async (e) => {
//     e.preventDefault();
//     if (!username.trim() || !password.trim()) {
//       alert("Please enter both username and password");
//       return;
//     }

//     try {
//       const response = await loginAdmin(username, password);
//       localStorage.setItem("adminToken", response.data.token);
//       navigate("/admin-dashboard");
//     } catch (error) {
//       alert(error?.response?.data?.message || "Login failed. Please try again.");
//     }
//   };

//   return (
//     <div
//       className="min-vh-100 d-flex flex-column"
//       style={{
//         background: "linear-gradient(to right, #e6f0ff, #ffffff)",
//         fontFamily: "'Segoe UI', sans-serif",
//       }}
//     >
//       <header className="text-white py-3 px-4" style={{ backgroundColor: "#0078FF" }}>
//         <h4 className="m-0 fw-bold">RechargeConnect Portal</h4>
//       </header>

//       <div className="flex-grow-1 d-flex justify-content-center align-items-center p-4">
//         <div
//           style={{
//             maxWidth: 420,
//             width: "100%",
//             background: "#fff",
//             borderRadius: 20,
//             boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
//             padding: "2rem",
//           }}
//         >
//           <h5 className="fw-bold text-center mb-2" style={{ color: "#0078FF" }}>
//             Welcome Back
//           </h5>
//           <p className="text-center text-muted mb-4">Choose your login method</p>

//           <div className="d-flex justify-content-center mb-3">
//             <button
//               type="button"
//               className="me-2"
//               onClick={() => setActiveTab("mobile")}
//               style={{
//                 borderRadius: "50px",
//                 padding: "0.5rem 1.5rem",
//                 border: "2px solid #0078FF",
//                 backgroundColor: activeTab === "mobile" ? "#0078FF" : "transparent",
//                 color: activeTab === "mobile" ? "#fff" : "#0078FF",
//                 fontWeight: "600",
//               }}
//             >
//               Mobile User
//             </button>
//             <button
//               type="button"
//               onClick={() => setActiveTab("admin")}
//               style={{
//                 borderRadius: "50px",
//                 padding: "0.5rem 1.5rem",
//                 border: "2px solid #0078FF",
//                 backgroundColor: activeTab === "admin" ? "#0078FF" : "transparent",
//                 color: activeTab === "admin" ? "#fff" : "#0078FF",
//                 fontWeight: "600",
//               }}
//             >
//               Admin Login
//             </button>
//           </div>

//           {activeTab === "mobile" && (
//             <>
//               <form onSubmit={handleMobileSubmit}>
//                 <div className="mb-3">
//                   <label htmlFor="mobileNumber" className="form-label fw-medium">
//                     Mobile Number
//                   </label>
//                   <input
//                     type="tel"
//                     id="mobileNumber"
//                     className="form-control"
//                     value={mobileNumber}
//                     onChange={(e) => setMobileNumber(e.target.value)}
//                     placeholder="Enter your 10-digit number"
//                     required
//                     style={{ borderRadius: "12px" }}
//                   />
//                 </div>
//                 <button
//                   type="submit"
//                   className="w-100 mb-2"
//                   style={{
//                     borderRadius: "50px",
//                     padding: "0.6rem",
//                     background: "linear-gradient(90deg, #0078FF 0%, #0056d2 100%)",
//                     color: "#fff",
//                     border: "none",
//                     fontWeight: "600",
//                     transition: "0.3s ease",
//                   }}
//                 >
//                   Verify & Continue
//                 </button>
//               </form>

//               <div className="text-center my-2 text-muted small">Not registered yet?</div>
//               <button
//                 className="w-100"
//                 onClick={() => navigate("/register")}
//                 style={{
//                   borderRadius: "50px",
//                   padding: "0.6rem",
//                   border: "2px solid #0078FF",
//                   backgroundColor: "transparent",
//                   color: "#0078FF",
//                   fontWeight: "600",
//                   transition: "0.3s ease",
//                 }}
//               >
//                 Create New Account
//               </button>
//             </>
//           )}

//           {activeTab === "admin" && (
//             <form onSubmit={handleAdminSubmit}>
//               <div className="mb-3">
//                 <label htmlFor="username" className="form-label fw-medium">
//                   Username
//                 </label>
//                 <input
//                   type="text"
//                   id="username"
//                   className="form-control"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   placeholder="Enter your username"
//                   required
//                   style={{ borderRadius: "12px" }}
//                 />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="password" className="form-label fw-medium">
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   id="password"
//                   className="form-control"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="Enter your password"
//                   required
//                   style={{ borderRadius: "12px" }}
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="w-100"
//                 style={{
//                   borderRadius: "50px",
//                   padding: "0.6rem",
//                   background: "linear-gradient(90deg, #0078FF 0%, #0056d2 100%)",
//                   color: "#fff",
//                   border: "none",
//                   fontWeight: "600",
//                   transition: "0.3s ease",
//                 }}
//               >
//                 Login as Admin
//               </button>
//             </form>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserAlt, FaUserShield } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-vh-100 d-flex flex-column"
      style={{
        background: "linear-gradient(to right, #e6fff5, #ffffff)", // soft green gradient
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      {/* Header */}
      <header
        className="d-flex justify-content-between align-items-center py-3 px-4"
        style={{ backgroundColor: "#10C88C" }}
      >
        <h4 className="m-0 fw-bold text-white">MobilePay</h4>
        <button
          onClick={() => navigate("/")}
          className="btn btn-outline-light rounded-pill"
          style={{ fontWeight: "bold" }}
        >
          Home
        </button>
      </header>

      {/* Main Content */}
      <div className="flex-grow-1 d-flex justify-content-center align-items-center p-4">
        <div className="row w-100" style={{ maxWidth: "900px" }}>
          {/* Mobile User Card */}
          <div className="col-md-6 mb-4">
            <div
              className="p-4 bg-white text-center shadow rounded-4 h-100 d-flex flex-column justify-content-between"
            >
              <div>
                <FaUserAlt size={48} className="text-success mb-3" />
                <h5 className="fw-bold mb-2">Mobile User</h5>
                <p className="text-muted mb-3">
                  Recharge your mobile quickly and securely. Access your account using your phone number.
                </p>
              </div>
              <button
                onClick={() => navigate("/user-login")}
                className="btn"
                style={{
                  backgroundColor: "#10C88C",
                  color: "white",
                  borderRadius: "50px",
                  padding: "10px 24px",
                  fontWeight: "bold",
                }}
              >
                Continue as User
              </button>
            </div>
          </div>

          {/* Admin Login Card */}
          <div className="col-md-6 mb-4">
            <div
              className="p-4 bg-white text-center shadow rounded-4 h-100 d-flex flex-column justify-content-between"
            >
              <div>
                <FaUserShield size={48} className="text-success mb-3" />
                <h5 className="fw-bold mb-2">Admin Login</h5>
                <p className="text-muted mb-3">
                  Manage recharge plans, users, and transactions. Secure login with admin credentials.
                </p>
              </div>
              <button
                onClick={() => navigate("/admin-login")}
                className="btn"
                style={{
                  backgroundColor: "#10C88C",
                  color: "white",
                  borderRadius: "50px",
                  padding: "10px 24px",
                  fontWeight: "bold",
                }}
              >
                Continue as Admin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
