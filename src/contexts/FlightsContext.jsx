import { createContext, useState, useEffect} from "react";

export const FlightsContext = createContext()

function FlightsContextProvider ({children}) {

    const [flights, setFlights] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getFlights = async() => {
        try {
            const response = await fetch('http://localhost:4000/flights')
            if (response.ok) {
                const flightsData = await response.json()
                setFlights(flightsData);
                setIsLoading(false);
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getFlights();
    }, [])

    const getOneFlight = (flightId) => {
        const oneFlight = flights.find(flight => flight.id === flightId)
        return oneFlight
    }

    // trigger refresh & timeout? (end video Day 3)

    return (
    <FlightsContext.Provider value={{ flights, isLoading, getFlights, getOneFlight }}>
        {children}
    </FlightsContext.Provider>
    )
}

export default FlightsContextProvider;