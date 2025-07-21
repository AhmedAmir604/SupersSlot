import React, { useEffect, useState } from "react";
import NavBar from "./_components/NavBar.jsx";
import "./App.css";
import LandingPage from "./pages/LandingPage.jsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Home from "./pages/Home.jsx";
import Booking from "./pages/Booking.jsx";
import ServiceDetails from "./pages/ServiceDetails.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import Discover from "./pages/Discover.jsx";
import { isLoggedIn } from "./handlers/authHandler.js";

// Protected route component
const ProtectedRoute = ({ children }) => {
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await isLoggedIn();
        console.log("res");
        setIsAuthenticated(res.data.loggedIn);
      } catch (err) {
        console.error("Auth check failed:", err);
        setIsAuthenticated(false);
      } finally {
        setAuthChecked(true);
      }
    };
    
    checkAuth();
  }, []);
  
  if (!authChecked) {
    // Show loading state while checking authentication
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  const location = useLocation();
  const hideNavBarPaths = [
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password",
  ];
  
  return (
    <main className="font-noto">
      {!hideNavBarPaths.includes(location.pathname) && <NavBar key={location.pathname} />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/services/:id" element={<ServiceDetails />} />
        <Route 
          path="/bookings/:id" 
          element={
            <ProtectedRoute>
              <Booking />
            </ProtectedRoute>
          } 
        />
        <Route path="/discover" element={<Discover />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </main>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
