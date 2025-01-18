import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home/Home"; // Ensure this is the correct import path
import AboutUs from "./pages/AboutUs/AboutUs";
import Explore from "./pages/Explore/Explore";
import Game from "./pages/Game/Game";
import "./App.css";
import logo from "./pages/image.png"; // Ensure logo is in the correct path

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="website-header">
          <div className="title-container">
            <img src={logo} alt="Unseen Logo" className="logo" />
            <div className="title-text">
              <center><h1>Unseen</h1></center>
              <p>Discover the Facts That Matter</p>
            </div>
          </div>
        </header>
        <nav className="tab-bar">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/game">Game</Link></li>
            <li><Link to="/explore">Explore</Link></li>
            <li><Link to="/aboutus">About</Link></li>
          </ul>
        </nav>
        <Routes>
          {/* Define the routes for each page */}
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
