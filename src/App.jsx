import "./App.css";
import { Route, Routes } from "react-router-dom"

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ErrorPage from "./pages/ErrorPage";
import FlightsListPage from "./pages/FlightsListPage";
import FlightDetailsPage from "./pages/FlightDetailsPage";
import MyFlights from "./pages/MyFlightsPage.jsx";

function App() {
  return (
    <div className="wrapper">
      <Navbar />
      <div className="mainCtn"> 
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={< AboutPage />} />
          <Route path="/flights" element={< FlightsListPage />} />
          <Route path="/flights/:id" element={< FlightDetailsPage />} />
          <Route path="/myflights" element={< MyFlights />} />
          <Route path="*" element={<ErrorPage />} />
          </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
