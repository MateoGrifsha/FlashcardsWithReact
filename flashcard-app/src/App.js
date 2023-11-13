import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './index.css';
import Navbar from "./components/Navbar";
import Home from "./pages/Home"
import Maths from "./pages/Maths"
import Biology from "./pages/Biology"
import Physics from "./pages/Physics"


function App() {
  return (
    <Router>
        <div className="App">
          <Navbar />
            <div className="content">
              <Routes>
                <Route exact path="/" element ={<Home />} />
                <Route exact path="/maths" element ={<Maths />} />
                <Route exact path="/biology" element ={<Biology />} />
                <Route exact path="/physics" element ={<Physics />} />
              </Routes>
            </div>
        </div>
    </Router>
  );
}

export default App;
