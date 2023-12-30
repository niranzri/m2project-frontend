import React from 'react';
import { Link } from 'react-router-dom';
import classes from '../styles/footer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';


function Footer () {
    return (
        <footer>
            <div className={classes.logoCtn}>                                
                <Link to="https://github.com/niranzri/m2project-frontend"><FontAwesomeIcon icon={faGithub} size="2xl" style={{color: "#0b0b62",}} /></Link>
            </div>
        </footer>
    )
}

export default Footer;