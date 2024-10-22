import NavBar from "./_components/NavBar.jsx";
import "./App.css";
import LandingPage from "./pages/LandingPage.jsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Home from "./pages/Home.jsx";
import Booking from "./pages/Booking.jsx";
import ServiceDetails from "./pages/ServiceDetails.jsx";

function App() {
  const location = useLocation();
  const hideNavBarPaths = [
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password",
  ];
  //React spa
  return (
    <main className="h-[140vh] font-noto">
      {!hideNavBarPaths.includes(location.pathname) && <NavBar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/services/:id" element={<ServiceDetails />} />
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
