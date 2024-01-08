import React from 'react';
import Select from 'react-select';
import { useState, useContext } from "react";
import { FlightsContext } from '../contexts/FlightsContext'
import classes from '../styles/flightsbrowser.module.css';

function FlightsBrowser () {
    const { flights } = useContext(FlightsContext) 

    const [selectedOrigin, setSelectedOrigin] = useState ('')
    const [selectedDestination, setSelectedDestination] = useState ('')
    const [date, setDate] = useState ('')

    // not necessary b/c the Select component automatically handles the selection of options
    //const handleOriginInput = event => setOrigin(event.target.value);
    //const handleDestinationInput = event => setDestination(event.target.value);
    const handleDateInput = event => setDate(event.target.value);

    const handleSubmit = event => {
        event.preventDefault();
    }

    /* sample arrays (no longer needed, here for reference)
    const originOptions = [
        {value: 'Madrid', label: 'Madrid'},
        {value: 'Barcelona', label: 'Barcelona'},
        {value: 'Amsterdam', label: 'Amsterdam'},
        {value: 'London', label: 'London'},
        {value: 'New York', label: 'New York'}
    ];
    const destinationOptions = [
        {value: 'Paris', label: 'Paris'},
        {value: 'Rome', label: 'Rome'}, 
        {value: 'Berlin', label: 'Berlin'},
        {value: 'Tokyo', label: 'Tokyo'},
        {value: 'Sydney', label: 'Sydney'},
    ];*/

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