import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { FlightsContext } from "../contexts/FlightsContext";

import classes from "../styles/flightslist.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

import americanLogo from "../images/american-logo.png";
import deltaLogo from "../images/delta-logo.png";
import emiratesLogo from "../images/emirates-logo.png";
import iberiaLogo from "../images/iberia-logo.png";
import turkishLogo from "../images/turkish-logo.png";

function FlightDetailsPage() {
  const { flights, toggleSave, calculateDuration } = useContext(FlightsContext);
  const { flightId } = useParams();

  const [flight, setFlight] = useState(undefined);

  const flightDuration = {};

  const airlineLogos = {
    "American Airlines": americanLogo,
    "Delta Air Lines": deltaLogo,
    Emirates: emiratesLogo,
    Iberia: iberiaLogo,
    "Turkish Airlines": turkishLogo,
  };

  useEffect(() => {
    const fetchedFlight = flights.find(
      (flight) => flight.id === Number(flightId)
    );
    setFlight(fetchedFlight);
  }, [flights, flightId]);

  if (flight) {
    const response = calculateDuration(flight);
    flightDuration.hours = response.hours;
    flightDuration.mins = response.mins;
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
            <p>
              {" "}
              <span>
                {" "}
                {flight.departure_time} &#8212; {flight.arrival_time}{" "}
              </span>{" "}
            </p>
            <p>
              {" "}
              {flight.departure_airport} ({flight.departure_city}) &#8212;
              {flight.arrival_airport} ({flight.arrival_city}){" "}
            </p>
          </div>
          <div className={classes.durationCtn}>
            <p> direct </p>
            <p key={flight.id}>
              {`${flightDuration?.hours}h ${flightDuration?.mins}mins`}
            </p>
          </div>
          <div className={classes.priceCtn}>
            <p>
              {" "}
              <span> {flight.price} € </span>{" "}
            </p>
          </div>
          <div className={classes.starCtn}>
            <button
              type="button"
              className={classes.btnStar}
              onClick={() => toggleSave(flight.id)}
            >
              {flight.isSaved ? (
                <FontAwesomeIcon
                  icon={solidStar}
                  size="xl"
                  style={{ color: "#08225a" }}
                />
              ) : (
                <FontAwesomeIcon
                  icon={regularStar}
                  size="xl"
                  style={{ color: "#08225a" }}
                />
              )}
            </button>
            <p> Saved? {flight.isSaved?.toString() || "No"} </p>
          </div>
        </div>
      )}
      <div className={classes.btnCtn}>
        <Link to="/flights">
          <button className={classes.btnBack}>Back to List</button>
        </Link>
      </div>
    </div>
  );
}

export default FlightDetailsPage;
