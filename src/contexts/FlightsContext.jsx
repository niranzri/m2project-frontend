import { createContext, useState, useEffect } from "react";

export const FlightsContext = createContext();

function FlightsContextProvider({ children }) {
  const [flights, setFlights] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [needsUpdate, setNeedsUpdate] = useState(true);
  const getFlights = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/flights`);
      if (response.ok) {
        const flightsData = await response.json();
        setFlights(flightsData);
        console.log("Fetched flights:", flightsData);
        setNeedsUpdate(false);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (needsUpdate) {
      getFlights();
    }
  }, [needsUpdate]);

  const getOneFlight = (flightId) => {
    const numericFlightId = Number(flightId);
    const oneFlight = flights.find((flight) => flight.id === numericFlightId);
    console.log("Found flight:", oneFlight);
    return oneFlight;
  };

  const toggleSave = (flightId) => {
    setFlights(
      flights.map((flight) => {
        if (flight.id === flightId) {
          return { ...flight, isSaved: !flight.isSaved };
        }
        return flight;
      })
    );
  };
  const updateFlightNote = async (flightId, noteIndex, updatedNote) => {
    try {
      const updatedFlights = flights.map((flight) => {
        if (flight.id === flightId) {
          const newNotes = [...flight.note];
          newNotes[noteIndex] = updatedNote; // Update specific note
          return { ...flight, note: newNotes };
        }
        return flight;
      });

      setFlights(updatedFlights);

      const flightToUpdate = updatedFlights.find(
        (flight) => flight.id === flightId
      );
      console.log("Updating flight with payload:", flightToUpdate); // Log the payload

      // Send the updated flight data to the server
      await fetch(`${import.meta.env.VITE_API_URL}/flights/${flightId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(flightToUpdate),
      });
    } catch (error) {
      console.error("Error updating flight note:", error);
    }
  };
  const deleteFlightNote = async (flightId, noteIndex) => {
    try {
      const updatedFlights = flights.map((flight) => {
        if (flight.id === flightId) {
          const updatedNotes = flight.note.filter(
            (_, index) => index !== noteIndex
          );
          return { ...flight, note: updatedNotes };
        }
        return flight;
      });

      setFlights(updatedFlights);

      // Update the server
      await fetch(`${import.meta.env.VITE_API_URL}/flights/${flightId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          updatedFlights.find((flight) => flight.id === flightId)
        ),
      });
    } catch (error) {
      console.error("Error deleting flight note:", error);
    }
  };

  const calculateDuration = (flight) => {
    // destructures departure and arrival time into hours and minutes and converts these to numbers
    const [depHours, depMinutes] = flight.departure_time.split(":").map(Number);
    const [arrHours, arrMinutes] = flight.arrival_time.split(":").map(Number);
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

    return { hours, mins };
  };

  return (
    <FlightsContext.Provider
      value={{
        flights,
        isLoading,
        setFlights,
        getFlights,
        getOneFlight,
        toggleSave,
        calculateDuration,
        setNeedsUpdate,
      }}
    >
      {children}
    </FlightsContext.Provider>
  );
}

export default FlightsContextProvider;
