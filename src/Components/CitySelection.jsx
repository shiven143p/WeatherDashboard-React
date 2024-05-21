import React, { useState, useEffect } from "react";
import { getDetailsFromAPI } from "../utils/http.js";
import WeatherDashboard from "./WeatherDashboard.jsx";
import { useNavigate } from "react-router-dom";

const CitySelection = ({ setLocationDetails, locationDetails } = props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [address, setAddress] = useState(locationDetails.address || "Noida");
  const navigate = useNavigate();

  useEffect(() => {
    async function GetLocationData() {
      try {
        setLoading(true);
        const url = `https://geocode.maps.co/search?q=${address}&api_key=664c5a8003b5a535969901fep9c8245`;
        const locationData = await getDetailsFromAPI(url);
        if (locationData != null || locationData != undefined) {
          setLocationDetails({
            lat: locationData[0].lat,
            lon: locationData[0].lon,
            display_name: locationData[0].display_name,
            address: address,
          });
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError(error);
        }
      }
      setLoading(false);
    }

    GetLocationData();
    return () => {};
  }, [address]);

  const handleSubmit = (e) => {
    console.log(locationDetails);
    navigate("/weatherdashboard", { state: locationDetails });
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

  return (
    <>
      <div className="heading">Make City Selection</div>
      <div className="content">
        <div className="column-2">
          <form className="form">
            <label htmlFor="city">Please select a city</label>
            <select
              id="city"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            >
              <option value="Noida">Noida</option>
              <option value="Delhi">Delhi</option>
              <option value="Gurgaon">Gurgaon</option>
            </select>
            <button type="button" onClick={handleSubmit}>
              Get Weather
            </button>
          </form>
        </div>
        <div className="column-2">
          <h3>Location Details:</h3>
          {content}
          {!loading && !error && (
            <>
              <p>Location Name: {locationDetails.display_name}</p>
              <p>Longitude: {locationDetails.lon}</p>
              <p>Latitude: {locationDetails.lat}</p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CitySelection;
