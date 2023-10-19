import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Router and Routes
import Navbar from '/Users/ahmadal-kayyali/Assignment1-2/Admin/src/Navbar.js'; 
import Home from '/Users/ahmadal-kayyali/Assignment1-2/Admin/src/Home.js'
import '/Users/ahmadal-kayyali/Assignment1-2/Admin/src/App.css';

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
