
import classes from "../styles/error.module.css";

function ErrorPage () {
    return (
        <div className="mainCtn error"> 
            <div className={classes.errorMessage}>
                <p className={classes.number}> 404 </p>
                <p className={classes.text}> Page not found </p>
            </div>
        </div>
    )
}

export default ErrorPage;