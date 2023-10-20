import React from "react";
import "./Home.css"; // Importing the CSS file for Home component styling

// Define a functional component for the Home page.
function Home() {
  return (
    <div className="container">
        <div className="home-container">
            <p className="home-text">
                {/* Display a welcome message for the admin and provide information. */}
                Welcome Admin, please find all relevant details via the navigation bar. If you are having issues, contact support@LoopCinemas.com
            </p>
            <img
                className="home-image"
                src="/SMS.png"
                alt="SMS Icon"
                width="300"
                height="200"
            />
        </div>
    </div>
  );
}

export default Home;
