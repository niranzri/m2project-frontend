import "./App.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MyFligths from "./pages/MyFligths";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/MyFlights" element={<MyFlights />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
