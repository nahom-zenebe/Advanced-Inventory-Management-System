
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./Components/Navbar";
import SignupPage from "./pages/SignupPages";
import ServicePage from "./pages/ServicePage";
function App() {
  return (
    <Router>
    <div>
 

      <Routes>
        <Route  path="/" element={<HomePage />} />
        <Route path="/about" element={< ServicePage/>} />
        <Route path="/SignupPage" element={<     SignupPage/>} />

      
      </Routes>
    </div>
  </Router>
);
}

export default App;