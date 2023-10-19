import * as React from "react";
import * as ReactDOM from "react-dom/client";
import '/Users/ahmadal-kayyali/Assignment1-2/Admin/src/index.css';
import App from '/Users/ahmadal-kayyali/Assignment1-2/Admin/src/App.js';
import reportWebVitals from '/Users/ahmadal-kayyali/Assignment1-2/Admin/src/reportWebVitals.js';

// Creating a root to render the app into
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendering the App component into the root
root.render(<App />);

// Running the function to report web vitals
reportWebVitals();
