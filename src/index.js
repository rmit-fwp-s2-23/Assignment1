import * as React from "react";
import * as ReactDOM from "react-dom/client"; // Importing ReactDOM
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Creating a root to render the app into
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendering the App component into the root
root.render(<App />);

// Running the function to report web vitals
reportWebVitals();
