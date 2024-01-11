import React, { useContext, useState, useEffect } from "react";
import { FlightsContext } from "../contexts/FlightsContext";
import classes from "../styles/myflights.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar as solidStar,
  faStar as regularStar,
  faPen,
  faCheck,
  faTimes,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

function MyFlightsPage() {
  const { flights, setFlights, toggleSave, updateFlightNote } =
    useContext(FlightsContext);
  const [pastFlights, setPastFlights] = useState([]);
  const [upcomingFlights, setUpcomingFlights] = useState([]);
  const [notes, setNotes] = useState({}); // Added missing state
  const [editingNoteId, setEditingNoteId] = useState(null); // Added missing state

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

  const handleNoteChange = (id, note) => {
    setNotes({ ...notes, [id]: note });
  };

  const saveNote = (flightId) => {
    const noteIndex = flights
      .find((flight) => flight.id === flightId)
      .note.findIndex((note) => note.id === editingNoteId);
    updateFlightNote(flightId, noteIndex, notes[flightId]);
    setEditingNoteId(null);
  };

  // Function to delete a note
  const removeNote = async (flightId) => {
    console.log(flightId);
    const flightToUpdate = flights.find((flight) => flight.id === flightId);
    if (!flightToUpdate) return;

    // Assuming each flight has only one note
    const updatedFlight = { ...flightToUpdate, note: [] };

    try {
      // Update the local state
      setFlights(
        flights.map((flight) =>
          flight.id === flightId ? updatedFlight : flight
        )
      );

      // Update the server
      await fetch(`${import.meta.env.VITE_API_URL}/flights/${flightId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFlight),
      });

      location.reload();
    } catch (error) {
      console.error("Error deleting flight note:", error);
    }
  };

  const renderNoteButtons = (flight) => (
    <>
      {!editingNoteId && (
        <button
          type="button"
          className={classes.btnNote}
          onClick={() => setEditingNoteId(flight.id)}
        >
          <FontAwesomeIcon icon={faPen} /> Add/Edit Note
        </button>
      )}
      {editingNoteId === flight.id && (
        <>
          <textarea
            value={notes[flight.id] || ""}
            onChange={(e) => handleNoteChange(flight.id, e.target.value)}
          />
          <button onClick={() => saveNote(flight.id)}>
            <FontAwesomeIcon icon={faCheck} size="sm" /> Save Note
          </button>
          <button onClick={() => setEditingNoteId(null)}>
            <FontAwesomeIcon icon={faTimes} size="sm" /> Cancel
          </button>
        </>
      )}
      {notes[flight.id] && (
        <div>
          <p>Note: {notes[flight.id]}</p>
          <button
            className={classes.btnDeleteNote}
            onClick={() => removeNote(flight.id)}
          >
            <FontAwesomeIcon icon={faTrashAlt} /> Delete Note
          </button>
        </div>
      )}
    </>
  );

  return (
    <div className="mainCtn myFlights">
      <h2>My Flights</h2>
      <div className={classes.flightsSection}>
        <div className={classes.pastFlights}>
          <h3>Past Flights</h3>
          {pastFlights.map((flight) => (
            <div key={flight.id} className={classes.flightCard}>
              <p>Departure city: {flight.departure_city}</p>
              <p>Departure airport: {flight.departure_airport}</p>
              <p>Departure time: {flight.departure_time}h</p>
              <div className={classes.contentCtn}>
                <p>Arrival city: {flight.arrival_city}</p>
                <p>Arrival airport: {flight.arrival_airport}</p>
                <p>Arrival time: {flight.arrival_time}h</p>
                <p>Flight date: {flight.flight_date}</p>
                <p>Airline: {flight.airline}</p>
                <p>Price: {flight.price} €</p>
              </div>
              <div className={classes.starCtn}>
                <button
                  type="button"
                  className={classes.iconStar}
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
              </div>
              {renderNoteButtons(flight)}
            </div>
          ))}
        </div>
        <div className={classes.upcomingFlights}>
          <h3>Upcoming Flights</h3>
          {upcomingFlights.map((flight) => (
            <div key={flight.id} className={classes.flightCard}>
              <p>Departure city: {flight.departure_city}</p>
              <p>Departure airport: {flight.departure_airport}</p>
              <p>Departure time: {flight.departure_time}h</p>
              <div className={classes.contentCtn}>
                <p>Arrival city: {flight.arrival_city}</p>
                <p>Arrival airport: {flight.arrival_airport}</p>
                <p>Arrival time: {flight.arrival_time}h</p>
                <p>Flight date: {flight.flight_date}</p>
                <p>Airline: {flight.airline}</p>
                <p>Price: {flight.price} €</p>
              </div>
              <div className={classes.starCtn}>
                <button
                  type="button"
                  className={classes.iconStar}
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
              </div>
              {renderNoteButtons(flight)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyFlightsPage;
