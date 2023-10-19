import React from "react";
import "./Home.css"; // Importing the CSS file for Footer styling

function Home() {
  return (
    <div className="container">
        <div className="home-container">
            <p className="home-text">Welcome Admin, please find all relevant details via the navigation bar. If you are having issues contact support@LoopCinemas.com</p>
            <img className="home-image" src="/SMS.png" alt="SMS Icon" width="300" height="200" />
        </div>
    </div>
  );
}

export default Home;