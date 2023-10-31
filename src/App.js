import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

import Calculator from "./calc";

import Weather, { WeatherApp } from "./WeatherApp";

import "./App.css";

function App() {
  return (
    <div className="div">
      <BrowserRouter>
        <ul className="ul">
          <li>
            {" "}
            <Link to="weather">
              <h4 className="hi">Weather</h4>
            </Link>
          </li>

          <li>
            {" "}
            <Link to="calculator">
              <h4 className="hi">Calculator</h4>
            </Link>
          </li>
        </ul>

        <Routes>
          <Route path="/" element={<div>Welcome</div>} />

          <Route path="weather" element={<Weather />} />

          <Route path="calculator" element={<Calculator />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
