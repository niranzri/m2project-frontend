import { createContext, useState, useEffect} from "react";

export const FlightsContext = createContext()

function FlightsContextProvider ({children}) {

    const [flights, setFlights] = useState([]);

    const getFlights = async() => {
        try {
            const response = await fetch('http://localhost:4000/flights')
            if (response.ok) {
                const flightsData = await response.json()
                setFlights(flightsData);
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getFlights();
    }, [])

    return (
    <FlightsContext.Provider value={{ flights, getFlights }}>
        {children}
    </FlightsContext.Provider>
    )
}

export default FlightsContextProvider;