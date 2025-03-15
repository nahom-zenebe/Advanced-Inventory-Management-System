import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./Components/Navbar";
import SignupPage from "./pages/SignupPages";
import ServicePage from "./pages/ServicePage";
import LoginPage from './pages/LoginPage';
import    Profilepage from './pages/Profilepage'
import ManagerDashboard from "./pages/ManagerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import StaffDashboard from "./pages/StaffDashboard";
import Productpage from './pages/Productpage';
import Orderpage from './pages/Orderpage';
import Salespage from './pages/Salespage';
import StockTransaction from './pages/StockTransaction';
import Categorypage from './pages/Categorypage';
import Inventorypage from './pages/Inventorypage';
import Notificationpage from './pages/Notificationpage';
import Supplierpage from './pages/Supplierpage';
import Activitylogpage from './pages/Activitylogpage';
import Dashboardpage from './pages/Dashboardpage';
import Userstatus from './pages/Userstatus'
import toast, { Toaster } from 'react-hot-toast';



function App() {
  return (

    <Router>
      <div>
     
        <Toaster />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<ServicePage />} />
          <Route path="/SignupPage" element={<SignupPage />} />
          <Route path="/LoginPage" element={<LoginPage />} />
    
          
       
          <Route path="/ManagerDashboard" element={<ManagerDashboard />}>
            <Route index element={<Dashboardpage />} />
            <Route path="product" element={<Productpage />} />
            <Route path="order" element={<Orderpage />} />
            <Route path="sales" element={<Salespage />} />
            <Route path="stock-transaction" element={<StockTransaction />} />
            <Route path="category" element={<Categorypage />} />
            <Route path="inventory" element={<Inventorypage />} />
            <Route path="notifications" element={<Notificationpage />} />
            <Route path="Profilepage" element={<   Profilepage />} />
            <Route path="supplier" element={<Supplierpage />} />
            <Route path="Userstatus" element={<Userstatus/>}/>
            <Route path="activity-log" element={<Activitylogpage />} />
 
          </Route>

          <Route path="/AdminDashboard" element={<AdminDashboard />} >
          <Route path="product" element={<Productpage />} />
            <Route path="order" element={<Orderpage />} />
            <Route path="sales" element={<Salespage />} />
            <Route path="stock-transaction" element={<StockTransaction />} />
            <Route path="category" element={<Categorypage />} />
            <Route path="inventory" element={<Inventorypage />} />
            <Route path="notifications" element={<Notificationpage />} />
            <Route path="Profilepage" element={<   Profilepage />} />
            <Route path="supplier" element={<Supplierpage />} />
            <Route path="activity-log" element={<Activitylogpage />} />
 
          </Route>
          <Route path="/StaffDashboard" element={<StaffDashboard />} >
          <Route path="product" element={<Productpage />} />
            <Route path="order" element={<Orderpage />} />
            <Route path="sales" element={<Salespage />} />
            <Route path="stock-transaction" element={<StockTransaction />} />
            <Route path="category" element={<Categorypage />} />
            <Route path="inventory" element={<Inventorypage />} />
            <Route path="notifications" element={<Notificationpage />} />
            <Route path="Profilepage" element={<   Profilepage />} />
            <Route path="supplier" element={<Supplierpage />} />
            <Route path="activity-log" element={<Activitylogpage />} />
 
          </Route>
        </Routes>
      </div>
    </Router>

  );
}

export default App;
