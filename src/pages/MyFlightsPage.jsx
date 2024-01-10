import React, { useContext, useState, useEffect } from "react";
import { FlightsContext } from "../contexts/FlightsContext";
import classes from "../styles/myflights.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
function MyFlightsPage() {
  const { flights, toggleSave } = useContext(FlightsContext);
  const [pastFlights, setPastFlights] = useState([]);
  const [upcomingFlights, setUpcomingFlights] = useState([]);
  const [notes, setNotes] = useState({});
  const [editingNoteId, setEditingNoteId] = useState(null);

  useEffect(() => {
    const now = new Date();
    const savedFlights = flights.filter((flight) => flight.isSaved);
    const past = savedFlights.filter(
      (flight) => new Date(flight.flight_date) < now
    );
    const upcoming = savedFlights.filter(
      (flight) => new Date(flight.flight_date) >= now
    );
    const handleNoteChange = (id, note) => {
      setNotes({ ...notes, [id]: note });
    };
    const saveNote = (id) => {
      setEditingNoteId(null);
      // Add logic here to persist the note if needed
    };

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
                Departure time : {flight.departure_time}h
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
                Arrival time : {flight.arrival_time}h
              </p>
              <p className="flight-detail">
                Flight date : {flight.flight_date}
              </p>
              <p className="flight-detail">Airline : {flight.airline}</p>
              <p className="flight-detail">Price : {flight.price}</p>

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
              <button
                type="button"
                className={classes.btnNote}
                onClick={() => setEditingNoteId(flight.id)}
              >
                <FontAwesomeIcon icon={faPencilAlt} /> Add Note
              </button>
              {editingNoteId === flight.id && (
                <>
                  <textarea
                    value={notes[flight.id] || ""}
                    onChange={(e) =>
                      handleNoteChange(flight.id, e.target.value)
                    }
                  />
                  <button onClick={() => saveNote(flight.id)}>
                    <FontAwesomeIcon icon={faCheck} size="sm" />
                  </button>
                </>
              )}
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
                Departure date : {flight.departure_time}h
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
                Arrival date : {flight.arrival_time}h
              </p>
              <p className="flight-detail">
                Flight date : {flight.flight_date}
              </p>
              <p className="flight-detail">Airline : {flight.airline}</p>
              <p className="flight-detail">Price : {flight.price}</p>
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
              <button
                type="button"
                className={classes.btnNote}
                onClick={() => setEditingNoteId(flight.id)}
              >
                <FontAwesomeIcon icon={faPencilAlt} /> Add Note
              </button>
              {editingNoteId === flight.id && (
                <>
                  <textarea
                    value={notes[flight.id] || ""}
                    onChange={(e) =>
                      handleNoteChange(flight.id, e.target.value)
                    }
                  />
                  <button onClick={() => saveNote(flight.id)}>
                    <FontAwesomeIcon icon={faCheck} size="sm" />
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyFlightsPage;
