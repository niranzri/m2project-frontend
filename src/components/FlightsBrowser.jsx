import React from 'react';
import { useState } from "react";
import classes from '../styles/flightsbrowser.module.css';

function FlightsBrowser () {
    const [origin, setOrigin] = useState ('')
    const [destination, setDestination] = useState ('')
    const [date, setDate] = useState ('')

    const handleOriginInput = event => setOrigin(event.target.value);
    const handleDestinationInput = event => setDestination(event.target.value);
    const handleDateInput = event => setDate(event.target.value);

    const handleSubmit = event => {
        event.preventDefault();
    }

    return (
        <div className={classes.browserCtn}>
            <h2> Where do you want to go? </h2>
            <form onSubmit={handleSubmit}>
                <div className={classes.inputCtn}>
                    <label> Origin </label>
                    <input 
                        type="text"
                        name="origin"
                        value={origin}
                        onChange={handleOriginInput}
                    />
                </div>

                <div className={classes.inputCtn}>
                    <label> Destination </label>
                    <input
                        type="text"
                        name="destination"
                        value={destination}
                        onChange={handleDestinationInput}
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