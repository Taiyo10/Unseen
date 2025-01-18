import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home/Home";
import AboutUs from "./pages/AboutUs/AboutUs";
import Explore from "./pages/Explore/Explore";
import Game from "./pages/Game/Game";
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <nav className="tab-bar">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/aboutus">About</Link></li>
            <li><Link to="/game">Services</Link></li>
            <li><Link to="/explore">Contact</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/game" element={<Game />} />
          <Route path="/explore" element={<Explore />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;