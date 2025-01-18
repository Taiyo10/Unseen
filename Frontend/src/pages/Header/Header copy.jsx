import React from "react";
import logo from "../../image.png"; // Adjust path as needed

function Header() {
  return (
    <header className="header-container">
      <div className="header-content">
        <img src={logo} alt="Site Logo" className="header-logo" />
        <h1 className="header-title">Unseen</h1>
      </div>
    </header>
  );
}

export default Header;

