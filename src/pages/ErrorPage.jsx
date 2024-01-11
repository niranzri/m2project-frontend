
import classes from "../styles/error.module.css";
import plane from "../images/plane-crash.png";

function ErrorPage () {
    return (
        <div className="mainCtn error"> 
            <div className={classes.errorMessage}>
                <p className={classes.number}> 404 </p>
                <p className={classes.text}> Page not found </p>
                <img src={plane} alt="plane crash" />
            </div>
        </div>
    )
}

export default ErrorPage;