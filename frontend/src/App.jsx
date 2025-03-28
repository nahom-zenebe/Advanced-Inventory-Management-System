import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import SignupPage from "./pages/SignupPages";
import ServicePage from "./pages/ServicePage";
import LoginPage from "./pages/LoginPage";
import Profilepage from "./pages/Profilepage";
import ManagerDashboard from "./pages/ManagerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import StaffDashboard from "./pages/StaffDashboard";
import Productpage from "./pages/Productpage";
import Orderpage from "./pages/Orderpage";
import Salespage from "./pages/Salespage";
import StockTransaction from "./pages/StockTransaction";
import Categorypage from "./pages/Categorypage";
import Notificationpage from "./pages/Notificationpage";
import Supplierpage from "./pages/Supplierpage";
import Activitylogpage from "./pages/Activitylogpage";
import Dashboardpage from "./pages/Dashboardpage";
import Userstatus from "./pages/Userstatus";
import NotificationPageRead from "./pages/Notificationpageread"
import ProtectedRoute from "./lib/ProtectedRoute";
import toast, { Toaster } from "react-hot-toast";

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

          <Route
            path="/ManagerDashboard"
            element={<ProtectedRoute element={<ManagerDashboard />} />}
          >
            <Route
              index
              element={<ProtectedRoute element={<Dashboardpage />} />}
            />
            <Route
              path="product"
              element={<ProtectedRoute element={<Productpage />} />}
            />
            <Route
              path="order"
              element={<ProtectedRoute element={<Orderpage />} />}
            />
            <Route
              path="sales"
              element={<ProtectedRoute element={<Salespage />} />}
            />
            <Route
              path="stock-transaction"
              element={<ProtectedRoute element={<StockTransaction />} />}
            />
            <Route
              path="category"
              element={<ProtectedRoute element={<Categorypage />} />}
            />
            <Route
              path="NotificationPageRead"
              element={<ProtectedRoute element={<NotificationPageRead />} />}
            />
            <Route
              path="Profilepage"
              element={<ProtectedRoute element={<Profilepage />} />}
            />
            <Route
              path="supplier"
              element={<ProtectedRoute element={<Supplierpage />} />}
            />
            <Route
              path="Userstatus"
              element={<ProtectedRoute element={<Userstatus />} />}
            />
            <Route
              path="activity-log"
              element={<ProtectedRoute element={<Activitylogpage />} />}
            />
          </Route>

          <Route
            path="/AdminDashboard"
            element={<ProtectedRoute element={<AdminDashboard />} />}
          >
            <Route
              path="product"
              element={<ProtectedRoute element={<Productpage />} />}
            />
            <Route
              path="order"
              element={<ProtectedRoute element={<Orderpage />} />}
            />
            <Route
              path="sales"
              element={<ProtectedRoute element={<Salespage />} />}
            />
            <Route
              path="stock-transaction"
              element={<ProtectedRoute element={<StockTransaction />} />}
            />
            <Route
              path="category"
              element={<ProtectedRoute element={<Categorypage />} />}
            />
            <Route
              path="notifications"
              element={<ProtectedRoute element={<Notificationpage />} />}
            />
            <Route
              path="Profilepage"
              element={<ProtectedRoute element={<Profilepage />} />}
            />
            <Route
              path="supplier"
              element={<ProtectedRoute element={<Supplierpage />} />}
            />
            <Route
              path="activity-log"
              element={<ProtectedRoute element={<Activitylogpage />} />}
            />
          </Route>

          <Route
            path="/StaffDashboard"
            element={<ProtectedRoute element={<StaffDashboard />} />}
          >
            <Route
              path="product"
              element={<ProtectedRoute element={<Productpage />} />}
            />
            <Route
              path="order"
              element={<ProtectedRoute element={<Orderpage />} />}
            />
            <Route
              path="sales"
              element={<ProtectedRoute element={<Salespage />} />}
            />
            <Route
              path="stock-transaction"
              element={<ProtectedRoute element={<StockTransaction />} />}
            />
            <Route
              path="category"
              element={<ProtectedRoute element={<Categorypage />} />}
            />
            <Route
              path="NotificationPageRead"
              element={<ProtectedRoute element={<NotificationPageRead/>} />}
            />
            <Route
              path="Profilepage"
              element={<ProtectedRoute element={<Profilepage />} />}
            />
            <Route
              path="supplier"
              element={<ProtectedRoute element={<Supplierpage />} />}
            />
            <Route
              path="activity-log"
              element={<ProtectedRoute element={<Activitylogpage />} />}
            />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
