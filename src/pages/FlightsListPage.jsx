import { useContext} from 'react'
import { FlightsContext } from '../contexts/FlightsContext'
import classes from '../styles/flightslist.module.css';
import { Link, useLocation } from 'react-router-dom';
import americanLogo from '../images/american-logo.png'


function FlightsListPage () {

    const location = useLocation();
    // {} ensures that the variables will be set to undefined if location.state is undefined
    // maybe create context if we need to re-use these data?
    const { selectedOrigin, selectedDestination, date } = location.state || {};

    // destructures flights from FlightsContext
    const { flights } = useContext(FlightsContext) 

    const filteredFlights = flights.filter(flight => {
        return (
            flight.departure_city === selectedOrigin &&
            flight.arrival_city === selectedDestination &&
            flight.flight_date === date
        )
    })

    //  <Link to={`/flights/${flight.id}`}></Link>

    return (
        <div className="mainCtn"> 
            <h1> Available flights </h1>
                {filteredFlights.map(flight => (
                    <div key={flight.id} className={classes.flightCtn}> 
                        <div className={classes.logoCtn}> 
                            <img src={americanLogo} alt="airline logo" className={classes.logo}/>
                        </div>
                        <div className={classes.detailsCtn}>
                            <p>Departure from: {flight.departure_city} </p>
                            <p>Arrival at: {flight.arrival_city} </p>
                            <p>Time : {flight.flight_date} </p>
                        </div>
                        <div className={classes.priceCtn}>
                            <p> {flight.price} € </p>
                        </div>
                        </div>
                ))}
        </div>
    )

}

export default FlightsListPage;