import { ButtonLoading } from "./_components/ButtonLoading.jsx";
import NavBar from "./_components/NavBar.jsx";
import "./App.css";
import LandingPage from "./pages/LandingPage.jsx";

function App() {
  return (
    <section className="h-[140vh]">
      <NavBar />
      <LandingPage />
    </section>
  );
}

export default App;
