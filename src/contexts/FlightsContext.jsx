import { createContext, useState, useEffect } from "react";

export const FlightsContext = createContext();

function FlightsContextProvider({ children }) {
  const [flights, setFlights] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getFlights = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}`);
      if (response.ok) {
        const flightsData = await response.json();
        setFlights(flightsData);
        console.log("Fetched flights:", flightsData); // Log to verify data
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFlights();
  }, []);

  const getOneFlight = (flightId) => {
    const numericFlightId = Number(flightId);
    const oneFlight = flights.find((flight) => flight.id === numericFlightId);
    console.log("Found flight:", oneFlight); // Log to verify found flight
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
  return (
    <FlightsContext.Provider
      value={{
        flights,
        toggleSave,
        isLoading,
        setFlights,
        getFlights,
        getOneFlight,
      }}
    >
      {children}
    </FlightsContext.Provider>
  );
}

export default FlightsContextProvider;
