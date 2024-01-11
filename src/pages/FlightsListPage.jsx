import { useContext } from "react";
import { FlightsContext } from "../contexts/FlightsContext";
import classes from "../styles/flightslistanddetails.module.css";
import { Link, useLocation } from "react-router-dom";

import americanLogo from "../images/american-logo.png";
import deltaLogo from "../images/delta-logo.png";
import emiratesLogo from "../images/emirates-logo.png";
import iberiaLogo from "../images/iberia-logo.png";
import turkishLogo from "../images/turkish-logo.png";

function FlightsListPage() {
  const location = useLocation();
  // {} ensures that the variables will be set to undefined if location.state is undefined
  let { selectedOrigin, selectedDestination, selectedDate } = location.state || {};

  // destructures flights from FlightsContext
  const { flights, calculateDuration, formatDate } = useContext(FlightsContext);

  if (!location.state) {
    selectedOrigin = localStorage.getItem("selectedOrigin");
    selectedDestination = localStorage.getItem("selectedDestination");
    selectedDate = localStorage.getItem("selectedDate");
  }

  const filteredFlights = flights.filter((flight) => {
    return (
      flight.departure_city === selectedOrigin &&
      flight.arrival_city === selectedDestination &&
      flight.flight_date == selectedDate
    );
  });

  const airlineLogos = {
    "American Airlines": americanLogo,
    "Delta Air Lines": deltaLogo,
    "Emirates": emiratesLogo,
    "Iberia": iberiaLogo,
    "Turkish Airlines": turkishLogo,
  };

  return (
    <div className="mainCtn flightsList">
      <h1> Available flights on {formatDate(selectedDate)}</h1>
      {filteredFlights.map((flight) => {
        const { hours, mins } = calculateDuration(flight);
        return (
          <Link
            key={flight.id}
            to={{
              pathname: `/flights/${flight.id}`,
            }}
          >
            <div key={flight.id} className={classes.flightCtn}>
              <div className={classes.logoCtn}>
                <img src={airlineLogos[flight.airline]} alt="airline logo" />
              </div>
              <div className={classes.detailsCtn}>
                <p>
                  <span>
                    {flight.departure_time} &#8212; {flight.arrival_time}
                  </span>
                </p>
                <p>
                  {flight.departure_airport} ({flight.departure_city}) &#8212;
                  {flight.arrival_airport} ({flight.arrival_city}){" "}
                </p>
              </div>
              <div className={classes.durationCtn}>
                <p> direct </p>
                <p key={flight.id}>
                  {hours}h {mins}mins
                </p>
              </div>
              <div className={classes.priceCtn}>
                <p>
                  <span> {flight.price} € </span>
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default FlightsListPage;
