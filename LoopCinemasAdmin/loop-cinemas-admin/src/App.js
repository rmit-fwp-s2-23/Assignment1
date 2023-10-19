import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Router and Routes
import Navbar from './Navbar.js'; 
import Home from './Home.js'
import './App.css';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        {/* <Route path="/reviews" element={<Reviews/>} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/users" element={<Users/>} />
        <Route path="/movies" element={<Movies/>} /> */}
      </Routes>
    </Router>
  );
}
export default App;
