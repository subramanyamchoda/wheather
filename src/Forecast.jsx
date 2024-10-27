import React, { useState } from "react";
import axios from "axios";

function Forecast() {
  const [city, setCity] = useState("");
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchForecast = async () => {
    if (!city.trim()) {
      setError("Please enter a city name.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const API_KEY = "fe6eb992b5df7964972861cfee90490a"; 
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      setForecastData(response.data);
    } catch (error) {
      setError("Error fetching forecast data. Please check the city name or try again later.");
      console.error("Error fetching forecast data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
      <h2 className="text-3xl font-bold text-white mb-6">5-Day Weather Forecast</h2>
      
      <div className="flex mb-4 w-full max-w-sm">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleInputChange}
          className="w-full px-4 py-2 rounded-l-md text-gray-800 focus:outline-none"
        />
        <button
          onClick={fetchForecast}
          className="bg-yellow-500 text-white px-4 py-2 rounded-r-md hover:bg-yellow-600 transition duration-300"
        >
          Get Forecast
        </button>
      </div>

      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
      {loading && <p className="text-white mb-4">Loading...</p>}

      {forecastData && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {forecastData.list
            .filter((_, index) => index % 8 === 0) 
            .map((forecast, index) => (
              <div
                key={index}
                className="bg-white bg-opacity-80 rounded-lg p-6 shadow-lg backdrop-blur-md text-gray-800"
              >
                <h4 className="text-xl font-semibold mb-2">
                  {new Date(forecast.dt * 1000).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </h4>
                <p className="text-lg">Temperature: {forecast.main.temp}°C</p>
                <p>Condition: {forecast.weather[0].description}</p>
                <p>Humidity: {forecast.main.humidity}%</p>
                <p>Wind Speed: {forecast.wind.speed} m/s</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default Forecast;
