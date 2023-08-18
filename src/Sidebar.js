import React, { useState } from "react";
import "./Sidebar.css";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sidebar">
      <div className="logo">

        <button onClick={toggleMenu} className="hamburger">
          &#9776;
        </button>

        <img
          href="/"
          src="/logo_draft.png"
          alt="Loop Cinemas Logo"
          className="homeLogo"
        />
      </div>
      
      <div className={`menu ${isOpen ? "open" : ""}`}>
        <a href="/">Movies</a>
        <a href="/">Festivals</a>
        <a href="/">Food & Drink</a>
        <a href="/">Cinemas</a>
        <a href="/">Festival Venues</a>
      </div>
    </div>
  );
}

export default Sidebar;
