import React from 'react';
import Select from 'react-select';
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"
import { FlightsContext } from '../contexts/FlightsContext'
import classes from '../styles/flightsbrowser.module.css';

function FlightsBrowser () {
    const { flights } = useContext(FlightsContext) 

    const [selectedOrigin, setSelectedOrigin] = useState ('')
    const [selectedDestination, setSelectedDestination] = useState ('')
    const [date, setDate] = useState ('')

    const navigate = useNavigate();

    // not necessary b/c the Select component automatically handles the selection of options
    //const handleOriginInput = event => setOrigin(event.target.value);
    //const handleDestinationInput = event => setDestination(event.target.value);
    const handleDateInput = event => setDate(event.target.value);

    const handleSubmit = event => {
        event.preventDefault();
        //console.log("Selected origin: ", selectedOrigin.value);
        //console.log("Selected destination: ", selectedDestination.value);
        console.log("Selected date: ", date);
        navigate('/flights', {
            state: {
                selectedOrigin: selectedOrigin.value,
                selectedDestination: selectedDestination.value,
                date: date,
            }
        })

        localStorage.setItem('selectedOrigin', selectedOrigin.value);
        localStorage.setItem('selectedDestination', selectedDestination.value);
        localStorage.setItem('date', date);
    }

    // arrays of unique origins and destinations
    const originOptions = flights.reduce((acc, flight) => {
        if (acc.findIndex(item => item.value === flight.departure_city) === -1) {
          acc.push({value: flight.departure_city, label: flight.departure_city});
        }
        return acc;
      }, []);

      const destinationOptions = flights.reduce((acc, flight) => {
        if (acc.findIndex(item => item.value === flight.arrival_city) === -1) {
          acc.push({value: flight.arrival_city, label: flight.arrival_city});
        }
        return acc;
      }, []);

    return (
        <div className={classes.browserCtn}>
            <form onSubmit={handleSubmit}>
                <div className={classes.inputCtn}>
                    <label> Origin </label>
                    <Select 
                        options={originOptions} 
                        value={selectedOrigin}
                        onChange={selectedOption => setSelectedOrigin(selectedOption)}
                    />
                </div>

                <div className={classes.inputCtn}>
                    <label> Destination </label>
                    <Select 
                        options={destinationOptions} 
                        value={selectedDestination}
                        onChange={selectedOption => setSelectedDestination(selectedOption)}
                    />
                </div>

                <div className={classes.inputCtn}>
                    <label> Date </label>
                    <input
                        type="date"
                        name="date"
                        value={date}
                        onChange={handleDateInput}
                    />
                </div>

                <div className={classes.inputCtn}>
                    <button type="submit"> Search </button>
                </div>

            </form>
        </div>
    )
}

export default FlightsBrowser;