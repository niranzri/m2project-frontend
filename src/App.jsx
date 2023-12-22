import "./App.css";
import { Link, Route, Routes } from "react-router-dom"

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import AboutPage from "./pages/AboutPage";
import ErrorPage from "./pages/ErrorPage";
import FlightsListPage from "./pages/FlightsListPage";
import FlightDetailsPage from "./pages/FlightDetailsPage";
import MyFlights from "./pages/MyFlights";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={< AboutPage />} />
        <Route path="/flights" element={< FlightsListPage />} />
        <Route path="/flights/:id" element={< FlightDetailsPage />} />
        <Route path="/myflights" element={< MyFlights />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
