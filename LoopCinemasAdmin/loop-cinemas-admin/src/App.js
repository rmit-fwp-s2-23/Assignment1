import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Router and Routes
import Navbar from './Navbar.js'; 
import Home from './Home.js'
import Movies from './Movies.js'
import Reviews from './Reviews.js'
import './App.css';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
       <Route path="/reviews" element={<Reviews/>} />
       <Route path="/movies" element={<Movies/>} /> 
        {/* 
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/users" element={<Users/>} />*/}
      </Routes>
    </Router>
  );
}
export default App;
