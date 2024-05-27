import React, { useState, useEffect } from "react";
import { getDetailsFromAPI } from "../utils/http.js";
import CitySelection from "./CitySelection";
import { useNavigate } from "react-router-dom";

const WeatherDashboard = ({ locationDetails } = props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [weatherData, setWeatherData] = useState({
    current_units: {
      time: "iso8601",
      interval: "seconds",
      temperature_2m: "°C",
      wind_speed_10m: "km/h",
    },
    current: {
      time: "2024-05-21T07:15",
      interval: 900,
      temperature_2m: 40.5,
      wind_speed_10m: 6.5,
    },
  });

  const { lat, lon, display_name } = locationDetails;
  const navigate = useNavigate();

  useEffect(() => {
    async function GetWeatherData() {
      try {
        setLoading(true);
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,is_day,precipitation,rain,snowfall,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m`;
        const weatherData = await getDetailsFromAPI(url);
        console.log(
          lat,
          lon,
          display_name,
          weatherData.current.temperature_2m,
          weatherData.current_units.temperature_2m
        );
        setWeatherData(weatherData);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError(error);
        }
      }
      setLoading(false);
    }

    GetWeatherData();
    return () => {
      const second = "test";
    };
  }, [locationDetails]);

  const handleSubmit = (e) => {
    navigate("/cityselection", { state: locationDetails });
  };

  let content = null;

  if (error != "") {
    content = (
      <div>
        <h4>Error fetching data.....</h4>
        <p>{error}</p>
      </div>
    );
  }

  if (loading) {
    content = (
      <div>
        <h4>Loading.....</h4>
      </div>
    );
  }

  const { current, current_units } = weatherData;

  return (
    <>
      {/* <CitySelection
        setLocationDetails={setLocationDetails}
        locationDetails={locationDetails}
      /> */}
      {content}
      {!loading && !error && (
        <>
          <div className="heading">
            Weather Dashboard for {display_name} (Latitude: {lat},Longitude:
            {lon})
          </div>
          <div className="content">
            <div className="column-2">
              <h3>Current Date Time</h3>
              {content}
              <p>
                DateTime: {current.time}
                {current_units.time}
              </p>
              <p>
                Day/Night: {current.is_day ? "Day" : "Night"}
                {current_units.is_day}
              </p>
            </div>
            <div className="column-2">
              <h3>Current Weather</h3>
              <p>
                Temperature: {current.temperature_2m}
                {current_units.temperature_2m}
              </p>
              <p>
                Relative Humidity: {current.relative_humidity_2m}
                {current_units.relative_humidity_2m}
              </p>
              <p>
                Precipitation: {current.precipitation}
                {current_units.precipitation}
              </p>
              <p>
                Rain: {current.rain}
                {current_units.rain}
              </p>
              <p>
                Snowfall: {current.snowfall}
                {current_units.snowfall}
              </p>
              <p>
                Sealevel Pressure: {current.pressure_msl}
                {current_units.pressure_msl}
              </p>
              <p>
                Surface Pressure: {current.surface_pressure}
                {current_units.surface_pressure}
              </p>
              <p>
                Wind Speed: {current.wind_speed_10m}
                {current_units.wind_speed_10m}
              </p>
              <p>
                Wind Direction: {current.wind_direction_10m}
                {current_units.wind_direction_10m}
              </p>
              {lat !== 0 && (
                <button
                  id="btnBackCitySelection"
                  type="button"
                  className="right_button"
                  onClick={handleSubmit}
                >
                  Back to city selection
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default WeatherDashboard;
