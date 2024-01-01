import FlightsBrowser from "../components/FlightsBrowser";

function HomePage() {
  return (
    <div className="mainCtn home"> 
      <h2> Where do you want to go? </h2>
      <FlightsBrowser />
    </div>
  );
}
export default HomePage;
