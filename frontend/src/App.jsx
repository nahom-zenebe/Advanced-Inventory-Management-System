
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ServicePage from "./pages/ServicePage";
function App() {
  return (
    <Router>
    <div>
      <nav className="bg-white p-8 rounded-lg shadow-lg">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
            <h1 className="text-3xl font-bold text-blue-600">welcome</h1>
          </li>

        </ul>
      </nav>

      <Routes>
        <Route  path="/" element={<HomePage />} />
        <Route path="/about" element={< ServicePage/>} />
      
      </Routes>
    </div>
  </Router>
);
}

export default App;