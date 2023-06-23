import "./App.css";
import abclogo from "./images/abclogo.svg";
import hrclogo from "./images/hrclogo (1).svg";
import ButtonSwitch from "./component/buttonSwitch";
import Footer from "./component/footer";
import { Box } from "@material-ui/core";
function App() {
  return (
    <div>
      <div style={{ border: "4px solid #fc7500", padding: "5px" }}>
        <Box>
          <div style={{ display: "flex" }}>
            <div style={{ width: "50%" }}>
              <img src={abclogo} alt="ABC Logo" />
            </div>
            <div style={{ width: "50%" }}>
              <img src={hrclogo} alt="ABC Logo" />
            </div>
          </div>
          <h2 style={{ color: "#db4437" }}>Invoice List</h2>
        </Box>
        <ButtonSwitch />
      </div>
      <Footer />
    </div>
  );
}

export default App;
