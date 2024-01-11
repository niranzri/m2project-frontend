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
  const { flights, setFlights, toggleSave, formatDate, updateFlightNote, addFlightNote, updateFlightReview, addFlightReview } =
    useContext(FlightsContext);
  const [pastFlights, setPastFlights] = useState([]);
  const [upcomingFlights, setUpcomingFlights] = useState([]);
  const [editingNoteId, setEditingNoteId] = useState(null); // Added missing state
  const [editingReviewId, setEditingReviewId] = useState(null); // Added missing state

  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem('notes')) || {});
  const [reviews, setReviews] = useState(JSON.parse(localStorage.getItem('reviews')) || {});

  useEffect(() => {
    // Save notes and reviews to localStorage whenever they change
    localStorage.setItem('notes', JSON.stringify(notes));
    localStorage.setItem('reviews', JSON.stringify(reviews));
  }, [notes, reviews]);

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
    if (editingNoteId === null) {
      // Add a new note
      addFlightNote(flightId, notes[flightId]);
    } else {
      // Update an existing note
      const noteIndex = flights
        .find((flight) => flight.id === flightId)
        .note.findIndex((note) => note.id === editingNoteId);
      updateFlightNote(flightId, noteIndex, notes[flightId]);
    }
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

      localStorage.removeItem('notes')
      location.reload();

    } catch (error) {
      console.error("Error deleting flight note:", error);
    }
  };

  // function to render the note buttons
  const renderNoteButtons = (flight) => (
    <div className={classes.innerBottomCtn}>
        {notes[flight.id] && <p><span> Travel Note: </span>{notes[flight.id]}</p>}
          <div className={classes.buttonsCtn}>
          {!editingNoteId && (
          <button
            type="button"
            className={classes.btn}
            onClick={() => setEditingNoteId(flight.id)}
          >
            <FontAwesomeIcon icon={faPen} /> {notes[flight.id] ? "Edit " : "Add "}
            Travel Note
          </button>
        )}
        {editingNoteId === flight.id && (
          <>
            <textarea
              value={notes[flight.id] || ""}
              className={classes.input}
              onChange={(e) => handleNoteChange(flight.id, e.target.value)}
            />
            <button
              type="button"
              className={classes.btn}
              onClick={() => saveNote(flight.id)}
            >
              <FontAwesomeIcon icon={faCheck} size="sm" /> Save
            </button>
            <button
              type="button"
              className={classes.btn}
              onClick={() => setEditingNoteId(null)}
            >
              <FontAwesomeIcon icon={faTimes} size="sm" /> Cancel
            </button>
          </>
        )}
        {notes[flight.id] && (
          <div>
            <button
              type="button"
              className={classes.btn}
              onClick={() => removeNote(flight.id)}
            >
              <FontAwesomeIcon icon={faTrashAlt} /> Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );


  // functions airline reviews (past flights)
  const handleReviewChange = (id, airline_review) => {
    setReviews({ ...reviews, [id]: airline_review });
  };

  const saveReview = (flightId) => {
    if (editingReviewId === null) {
      // Add a new review
      addFlightReview(flightId, reviews[flightId]);
    } else {
      // Update an existing review
      const reviewIndex = flights
        .find((flight) => flight.id === flightId)
        .airline_review.findIndex((airline_review) => airline_review.id === editingReviewId);
      updateFlightReview(flightId, reviewIndex, reviews[flightId]);
    }
    setEditingReviewId(null);
  };

  // function to delete an airline review
  const removeReview = async (flightId) => {
    console.log(flightId);
    const flightToUpdate = flights.find((flight) => flight.id === flightId);
    if (!flightToUpdate) return;

    // Assuming each flight has only one review
    const updatedFlight = { ...flightToUpdate, airline_review: [] };

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

      localStorage.removeItem('reviews')
      location.reload();

    } catch (error) {
      console.error("Error deleting airline review:", error);
    }
  };


  // function to render the review buttons
  const renderReviewButtons = (flight) => (
    <div className={classes.innerBottomCtn}>
        {reviews[flight.id] && <p><span> Airline Review: </span>{reviews[flight.id]}</p>}
          <div className={classes.buttonsCtn}>
          {!editingReviewId && (
          <button
            type="button"
            className={classes.btn}
            onClick={() => setEditingReviewId(flight.id)}
          >
            <FontAwesomeIcon icon={faPen} /> {reviews[flight.id] ? "Edit " : "Add "}
            Airline Review
          </button>
        )}
        {editingReviewId === flight.id && (
          <>
            <textarea
              value={reviews[flight.id] || ""}
              className={classes.input}
              onChange={(e) => handleReviewChange(flight.id, e.target.value)}
            />
            <button
              type="button"
              className={classes.btn}
              onClick={() => saveReview(flight.id)}
            >
              <FontAwesomeIcon icon={faCheck} size="sm" /> Save
            </button>
            <button
              type="button"
              className={classes.btn}
              onClick={() => setEditingReviewId(null)}
            >
              <FontAwesomeIcon icon={faTimes} size="sm" /> Cancel
            </button>
          </>
        )}
        {reviews[flight.id] && (
          <div>
            <button
              type="button"
              className={classes.btn}
              onClick={() => removeReview(flight.id)}
            >
              <FontAwesomeIcon icon={faTrashAlt} /> Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="mainCtn myFlights">
      <h2>My Flights</h2>
      <div className={classes.flightsSection}>
        <div className={classes.pastFlights}>
          <h3>Past Flights</h3>
          {pastFlights.map((flight) => (
            <div key={flight.id} className={classes.flightCard}>
              <div className={classes.topCtn}>
                <div className={classes.flightInfo}>
                  <p>
                    <span> Flight date: </span> {formatDate(flight.flight_date)}
                  </p>
                  <div className={classes.contentCtn}>
                    <p>
                      <span> Departure city: </span> {flight.departure_city}
                    </p>
                    <p>
                      <span> Departure airport: </span>{" "}
                      {flight.departure_airport}
                    </p>
                    <p>
                      <span> Departure time: </span>
                      {flight.departure_time}h
                    </p>
                  </div>
                  <div className={classes.contentCtn}>
                    <p>
                      <span> Arrival city: </span> {flight.arrival_city}
                    </p>
                    <p>
                      <span> Arrival airport: </span>
                      {flight.arrival_airport}
                    </p>
                    <p>
                      <span> Arrival time: </span> {flight.arrival_time}h
                    </p>
                  </div>
                  <p>
                    {" "}
                    <span> Airline: </span> {flight.airline}
                  </p>
                  <p>
                    <span> Price: </span>
                    {flight.price} €
                  </p>
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
              </div>
              <div className={classes.bottomCtn}>
                {renderReviewButtons(flight)}
              </div>
            </div>
          ))}
        </div>
        <div className={classes.upcomingFlights}>
          <h3>Upcoming Flights</h3>
          {upcomingFlights.map((flight) => (
            <div key={flight.id} className={classes.flightCard}>
              <div className={classes.topCtn}>
                <div className={classes.flightInfo}>
                  <p>
                    <span> Flight date: </span> {formatDate(flight.flight_date)}
                  </p>
                  <div className={classes.contentCtn}>
                    <p>
                      <span> Departure city: </span> {flight.departure_city}
                    </p>
                    <p>
                      <span> Departure airport: </span>{" "}
                      {flight.departure_airport}
                    </p>
                    <p>
                      <span> Departure time: </span>
                      {flight.departure_time}h
                    </p>
                  </div>
                  <div className={classes.contentCtn}>
                    <p>
                      <span> Arrival city: </span> {flight.arrival_city}
                    </p>
                    <p>
                      <span> Arrival airport: </span>
                      {flight.arrival_airport}
                    </p>
                    <p>
                      <span> Arrival time: </span> {flight.arrival_time}h
                    </p>
                  </div>
                  <p>
                    {" "}
                    <span>Airline: </span> {flight.airline}
                  </p>
                  <p>
                    <span>Price: </span>
                    {flight.price} €
                  </p>
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
              </div>
              <div className={classes.bottomCtn}>
                {renderNoteButtons(flight)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyFlightsPage;
