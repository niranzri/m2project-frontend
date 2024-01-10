import { createContext, useState, useEffect } from "react";

export const FlightsContext = createContext();

function FlightsContextProvider({ children }) {
  const [flights, setFlights] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getFlights = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/flights`);
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

    return {hours, mins};
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
      }}
    >
      {children}
    </FlightsContext.Provider>
  );
}

export default FlightsContextProvider;
