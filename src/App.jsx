import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import imgSrc from "./assets/react.svg";
import Header from "./Components/Header";
import Home from "./Components/Home";
import CitySelection from "./Components/CitySelection";
import WeatherDashboard from "./Components/WeatherDashboard";
import NotFound from "./Components/NotFound";

const App = () => {
  const title = "Weather Dashboard";

  const [locationDetails, setLocationDetails] = useState({
    lat: 0,
    lon: 0,
    display_name: "Default Location",
    address: "Noida",
  });

  return (
    <div className="container">
      <Header imgSrc={imgSrc} title={title} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/cityselection"
            element={
              <CitySelection
                setLocationDetails={setLocationDetails}
                locationDetails={locationDetails}
              />
            }
          />
          <Route
            path="/weatherdashboard"
            element={<WeatherDashboard locationDetails={locationDetails} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
