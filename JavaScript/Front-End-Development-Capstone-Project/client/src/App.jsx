// Import components for routing from react-router-dom library
import { BrowserRouter, Routes, Route } from "react-router";

// Import custom Navbar component
import Navbar from './components/Navbar/Navbar';
import LandingPage from './components/Landing_Page/Landing';
import Login from './components/Login/Login'; // Add Login component
import Sign_Up from './components/Sign_Up/SignUp'; // Add SignUp component

// Function component for the main App
function App() {

  // Render the main App component
  return (
    <BrowserRouter>
      {/* Display the Navbar component */}
      <Navbar />
      {/* Set up the Routes for different pages */}
      <Routes>
        {/* Define individual Route components for different pages */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} /> {/* Route for Login */}
        <Route path="/sign-up" element={<Sign_Up />} /> {/* Route for SignUp */}
      </Routes>
    </BrowserRouter>
  );
}

// Export the App component as the default export
export default App;