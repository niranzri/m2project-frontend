import React, { useContext, useState, useEffect } from "react";
import { FlightsContext } from "../contexts/FlightsContext";
import classes from "../styles/myflights.module.css";

function MyFlightsPage() {
  const { flights } = useContext(FlightsContext);
  const [pastFlights, setPastFlights] = useState([]);
  const [upcomingFlights, setUpcomingFlights] = useState([]);

  useEffect(() => {
    const now = new Date();
    const savedFlights = flights.filter((flight) => flight.isSaved);
    const past = savedFlights.filter(
      (flight) => new Date(flight.flight_date) < now
    );
    const upcoming = savedFlights.filter(
      (flight) => new Date(flight.flight_date) >= now
    );

    setPastFlights(past);
    setUpcomingFlights(upcoming);
  }, [flights]);

  return (
    <div className={classes.myFlightsContainer}>
      <h2>My Flights</h2>
      <div className={classes.flightsSection}>
        <div className={classes.pastFlights}>
          <h3>Past Flights</h3>
          {pastFlights.map((flight) => (
            <div key={flight.id} className={classes.flightCard}>
              <p className="flight-detail">
                Departure city : {flight.departure_city}
              </p>
              <p className="flight-detail">
                Departure date : {flight.departure_date}
              </p>
              <p className="flight-detail">
                Departure airport : {flight.departure_airport}
              </p>
              <p className="flight-detail">
                Arrival city : {flight.arrival_city}
              </p>
              <p className="flight-detail">
                Arrival airport : {flight.arrival_airport}
              </p>
              <p className="flight-detail">
                Arrival date : {flight.arrival_date}
              </p>
              <p className="flight-detail">
                Flight date : {flight.flight_date}
              </p>
              <p className="flight-detail">Airline : {flight.airline}</p>
              <p className="flight-detail">Price : {flight.price}</p>
              <button className="flight-detail-button">
                {flight.isSaved ? "⭐" : "☆"}
              </button>
            </div>
          ))}
        </div>
        <div className={classes.upcomingFlights}>
          <h3>Upcoming Flights</h3>
          {upcomingFlights.map((flight) => (
            <div key={flight.id} className={classes.flightCard}>
              <p className="flight-detail">
                Departure city : {flight.departure_city}
              </p>
              <p className="flight-detail">
                Departure date : {flight.departure_date}
              </p>
              <p className="flight-detail">
                Departure airport : {flight.departure_airport}
              </p>
              <p className="flight-detail">
                Arrival city : {flight.arrival_city}
              </p>
              <p className="flight-detail">
                Arrival airport : {flight.arrival_airport}
              </p>
              <p className="flight-detail">
                Arrival date : {flight.arrival_date}
              </p>
              <p className="flight-detail">
                Flight date : {flight.flight_date}
              </p>
              <p className="flight-detail">Airline : {flight.airline}</p>
              <p className="flight-detail">Price : {flight.price}</p>
              <button className="flight-detail-button">
                {flight.isSaved ? "⭐" : "☆"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyFlightsPage;
