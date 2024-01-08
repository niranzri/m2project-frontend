import { useContext} from 'react'
import { FlightsContext } from '../contexts/FlightsContext'
import classes from '../styles/flightslist.module.css';
import { Link } from 'react-router-dom';

function FlightsListPage () {

    const { flights } = useContext(FlightsContext) // destructures flights from FlightsContext

    return (
        <div className="mainCtn"> 
            <h1> Flights list </h1>
                {flights.map(flight => (
                    <div key={flight.id} className={classes.flightCtn}> 
                    <Link to={`/flights/${flight.id}`}>
                        <p>Departure from: {flight.departure_city} </p>
                        <p>Arrival at: {flight.arrival_city} </p>
                    </Link>
                    </div>
                ))}
        </div>
    )

}

export default FlightsListPage;