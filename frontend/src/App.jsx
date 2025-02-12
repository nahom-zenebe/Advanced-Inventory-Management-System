
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./Components/Navbar";
import SignupPage from "./pages/SignupPages";
import ServicePage from "./pages/ServicePage";
import LoginPage from './pages/LoginPage'
import ManagerDashboard from "./pages/ManagerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import StaffDashboard from "./pages/StaffDashboard";


import toast, { Toaster } from 'react-hot-toast';
function App() {
  return (
    <Router>
    <div>
 

      <Routes>
        <Route  path="/" element={<HomePage />} />
        <Route path="/about" element={< ServicePage/>} />
        <Route path="/SignupPage" element={<SignupPage/>} />
        <Route path="/LoginPage" element={<LoginPage/>} />
        <Route path="/ManagerDashboard" element={<ManagerDashboard/>} />
        <Route path="/AdminDashboard" element={<AdminDashboard/>} />
        <Route path="/ StaffDashboard" element={< StaffDashboard/>} />

  
      
      </Routes>
      <Toaster />
    </div>
  </Router>
);
}

export default App;