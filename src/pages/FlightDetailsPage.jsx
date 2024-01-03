import { useParams, useContext, useState, useEffect } from 'react'
import { FlightsContext } from '../contexts/FlightsContext'

function FlightDetailsPage () {

    const { flightId } = useParams()
    const { getOneFlight } = useContext(FlightsContext)
    const [ flight, setFlight ] = useState()

    useEffect(() => {
        setFlight(getOneFlight(flightId))
    }, [flightId])

    // details needed (flight unused)
    return (
        <div className="mainCtn"> 
            <h1> Flight details </h1>
        </div>
    )
}

export default FlightDetailsPage;