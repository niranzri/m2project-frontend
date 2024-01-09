import { useContext } from "react";
import { FlightsContext } from "../contexts/FlightsContext";
import classes from "../styles/flightslist.module.css";
import { Link, useLocation } from "react-router-dom";

import americanLogo from "../images/american-logo.png";
import deltaLogo from "../images/delta-logo.png";
import emiratesLogo from "../images/emirates-logo.png";
import iberiaLogo from "../images/iberia-logo.png";
import turkishLogo from "../images/turkish-logo.png";

function FlightsListPage() {
  const location = useLocation();
  // {} ensures that the variables will be set to undefined if location.state is undefined
  // maybe create context if we need to re-use these data?
  const { selectedOrigin, selectedDestination, date } = location.state || {};

  // destructures flights from FlightsContext
  const { flights } = useContext(FlightsContext);

  const originalDate = date;
  const parts = originalDate.split("-"); // splits the date string by the hyphen
  const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;

  const filteredFlights = flights.filter((flight) => {
    return (
      flight.departure_city === selectedOrigin &&
      flight.arrival_city === selectedDestination &&
      flight.flight_date === date
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
    <div className="mainCtn">
      <h1> Available flights on {formattedDate}</h1>
      {filteredFlights.map((flight) => {
        // destructures departure and arrival time into hours and minutes and converts these to numbers
        const [depHours, depMinutes] = flight.departure_time
          .split(":")
          .map(Number);
        const [arrHours, arrMinutes] = flight.arrival_time
          .split(":")
          .map(Number);
        const timeDifference = flight.time_difference;

        // converting arrival and departure time to minutes
        const depInMinutes = depHours * 60 + depMinutes;
        const arrInMinutes = arrHours * 60 + arrMinutes + timeDifference * 60;
        console.log("Time Difference:", timeDifference);
        console.log("Departure Minutes:", depInMinutes);
        console.log("Arrival Minutes:", arrInMinutes);

        let difference = arrInMinutes - depInMinutes;

        const hours = Math.floor(difference / 60);
        const mins = difference % 60;

        return (
          <Link to={`/flights/${flight.id}`}>
            <div key={flight.id} className={classes.flightCtn}>
              <div className={classes.logoCtn}>
                <img src={airlineLogos[flight.airline]} alt="airline logo" />
              </div>
              <div className={classes.detailsCtn}>
                <p>
                  {" "}
                  <span>
                    {" "}
                    {flight.departure_time} &#8212; {flight.arrival_time}{" "}
                  </span>
                </p>
                <p>
                  {" "}
                  {flight.departure_airport} ({flight.departure_city}) &#8212;{" "}
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
                  {" "}
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
