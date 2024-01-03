import "./App.css";
import { Route, Routes } from "react-router-dom"
import { useContext } from "react";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ErrorPage from "./pages/ErrorPage";
import FlightsListPage from "./pages/FlightsListPage";
import FlightDetailsPage from "./pages/FlightDetailsPage";
import MyFlightsPage from "./pages/MyFlightsPage";
import { FlightsContext } from "./contexts/FlightsContext.jsx";

function App() {
  const { isLoading } = useContext(FlightsContext)

  return isLoading ? (<h1>Loading...</h1>) : 
  (
    <div className="wrapper">
      <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={< AboutPage />} />
          <Route path="/flights" element={< FlightsListPage />} />
          <Route path="/flights/:id" element={< FlightDetailsPage />} />
          <Route path="/myflights" element={< MyFlightsPage />} />
          <Route path="*" element={<ErrorPage />} />
          </Routes>
      <Footer />
    </div>
  );
}

export default App;
