import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { FlightsContext } from "../contexts/FlightsContext";
import "../styles/flightdetails.module.css";

function FlightDetailsPage() {
  const { flightId } = useParams();
  const { flights } = useContext(FlightsContext);
  const [flight, setFlight] = useState();

  const getOneFlight = (flightId) => {
    const numericFlightId = Number(flightId);
    const oneFlight = flights.find((flight) => flight.id === numericFlightId);
    return oneFlight;
  };

  useEffect(() => {
    const fetchFlight = async () => {
      try {
        const fetchedFlight = await getOneFlight(flightId);

        setFlight(fetchedFlight);
      } catch (error) {
        console.error("Error fetching flight:", error);
      }
    };

    fetchFlight();
  }, [flightId]);

  return (
    <div className="flight-details-container">
      {flight && (
        <>
          <p className="flight-detail">
            Departure city : {flight.departure_city}
          </p>
          <p className="flight-detail">
            Departure date : {flight.departure_date}
          </p>
          <p className="flight-detail">
            Departure airport : {flight.departure_airport}
          </p>
          <p className="flight-detail">Arrival city : {flight.arrival_city}</p>
          <p className="flight-detail">
            Arrival airport : {flight.arrival_airport}
          </p>
          <p className="flight-detail">Arrival date : {flight.arrival_date}</p>
          <p className="flight-detail">Flight date : {flight.flight_date}</p>
          <p className="flight-detail">Airline : {flight.airline}</p>
          <p className="flight-detail">Price : {flight.price}</p>
          <button className="flight-detail-button">
            {flight.isSaved ? "⭐" : "☆"}{" "}
          </button>
        </>
      )}
    </div>
  );
}

export default FlightDetailsPage;
