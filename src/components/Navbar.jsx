import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import classes from '../styles/navbar.module.css';
import appLogo from '../images/logo.png';
import appLogo2 from '../images/logo-2.png';

function Navbar () {
    return (
        <nav>
            <div className={classes.logoCtn}> 
                <img src={appLogo2} alt="appLogo" className={classes.logo}/>
            </div>
            <div className={classes.linksCtn}>
                <NavLink to="/about" className={classes.link}> About </NavLink>
                <NavLink to="/" className={classes.link}> Flights Browser </NavLink>
                <NavLink to="/myflights" className={classes.link}> My Flights </NavLink>
            </div>
            <div className={classes.loginCtn}>                                
                <FontAwesomeIcon icon={faUser} size="2xl" />
            </div>
        </nav>
    );
}

export default Navbar;