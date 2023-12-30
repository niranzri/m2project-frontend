import classes from '../styles/about.module.css';
import Noe from '../images/Noe.jpeg';

function AboutPage () {
    return (
    <div className="mainCtn coverImageAbout"> 
        <div className={classes.aboutCtn}>
            <div className={classes.aboutText}>
                <h1> Elevating Your Expectations Since 1992 </h1>
                <p> Welcome to FlyZest, a beacon of Spanish aviation. 
                Founded in 1992 by Jesús Cidoncha and Noelia Iranzo, we are a testament to loyalty and commitment. 
                Over the decades, our journey has demonstrated our dedication to providing exceptional flight services. 
                At FlyZest, we soar above the rest, connecting people and places with Spanish warmth and reliability. </p>
                <p> Your journey matters to us, and we are committed to making it memorable with FlyZest.</p>
                <div className={classes.imagesCtn}>
                    <div className={classes.imageCtn}>
                        <img src={Noe} alt="image of Jesús" />
                        <p> Jesús Cidoncha Berlanga, CEO</p>
                    </div>
                    <div className={classes.imageCtn}>
                        <img src={Noe} alt="image of Noelia"/>
                        <p> Noelia Iranzo Ribera, CEO</p>
                    </div>
                </div>
            </div>
        </div>
    </div> 
    )
}

export default AboutPage;