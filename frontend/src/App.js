import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
        // Your main page (the one you showed me)
import Login from './components/Login'
import UserLogin from './components/UserLogin';
import AdminLogin from "./components/AdminLogin";
import Home from './components/Home'
import AdminDashboard from './components/AdminDashboard';
import RechargeInterface from './components/Recharge';
import PaymentForm from './components/PaymentPage';
import SubscriberRegistration from './components/Registration';
import RechargeSuccess from './components/RechargeSuccess';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/" element={<Home />} />
        <Route path="/admin-dashboard" element={<AdminDashboard/>} />
        <Route path="/recharge" element={<RechargeInterface/>} />
        <Route path="/payment" element={<PaymentForm/>} />
        <Route path="/register" element={<SubscriberRegistration/>} />
        <Route path="/recharge-success" element={<RechargeSuccess/>} />
      </Routes>
    </Router>
  );
}

export default App;
