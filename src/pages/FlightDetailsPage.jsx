import { useState, useEffect, useContext } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { FlightsContext } from "../contexts/FlightsContext";

import classes from "../styles/flightslist.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar} from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar} from '@fortawesome/free-regular-svg-icons';


import americanLogo from "../images/american-logo.png";
import deltaLogo from "../images/delta-logo.png";
import emiratesLogo from "../images/emirates-logo.png";
import iberiaLogo from "../images/iberia-logo.png";
import turkishLogo from "../images/turkish-logo.png";


function FlightDetailsPage() {
  const { flights, setFlights } = useContext(FlightsContext);
  const { flightId } = useParams();
  const [flight, setFlight] = useState({});

  const location = useLocation();
  const { duration } = location.state || {};
  const { hours, mins} = duration || {};

  const getOneFlight = (flightId) => {
    const numericFlightId = Number(flightId);
    const oneFlight = flights.find((flight) => flight.id === numericFlightId);
    return oneFlight;
  };

  const airlineLogos = {
    "American Airlines": americanLogo,
    "Delta Air Lines": deltaLogo,
    "Emirates": emiratesLogo,
    "Iberia": iberiaLogo,
    "Turkish Airlines": turkishLogo,
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


  const toggleSave = ( flightId ) => {
    const updatedFlights = flights.map(flight => {
        if (flight.id === flightId) {
            return {... flight, isSaved: !flight.isSaved}
        }
        return flight
    })

    setFlights(updatedFlights)
    const updatedFlight = getOneFlight(flightId)
    setFlight(updatedFlight)
  }

  return (
    <div className="mainCtn"> 
    <h1> Flight details </h1>
      {flight && (
        <div className={classes.flightCtn}>
            <div className={classes.logoCtn}>
                <img src={airlineLogos[flight.airline]} alt="airline logo" />
            </div>
            <div className={classes.detailsCtn}>
                <p> <span> {flight.departure_time} &#8212; {flight.arrival_time} </span> </p>
                <p> {flight.departure_airport} ({flight.departure_city}) &#8212;
                    {flight.arrival_airport} ({flight.arrival_city}) </p>
            </div>
            <div className={classes.durationCtn}>
                <p> direct </p>
                <p key={flight.id}> 
                    {hours}h {mins}mins </p>
            </div>
            <div className={classes.priceCtn}>
                <p> <span> {flight.price} € </span> </p>
            </div>
            <div className={classes.starCtn}>
                <button type="button" className={classes.btnStar} onClick={()=> toggleSave(flight.id)}>
                    {flight.isSaved ? (
                        <FontAwesomeIcon icon={solidStar} size="xl" style={{color: "#08225a",}} />
                    ) : (
                        <FontAwesomeIcon icon={regularStar} size="xl" style={{color: "#08225a",}} />
                    )};
                </button>
                <p> Saved? {flight.isSaved?.toString() || ''} </p>
            </div>
        </div>
      )}
      <div className={classes.btnCtn}>
        <Link to="/flights">   
            <button className={classes.btnBack}>
                Back to List 
            </button>
        </Link> 
      </div>
    </div>
  );
}

/*
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
  */


export default FlightDetailsPage;
