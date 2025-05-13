import React, { useEffect, useState } from "react";
import WeatherCard from "./components/WeatherCard";
import ForecastCard from "./components/ForecastCard";
import axios from 'axios';
import './App.css'



const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      fetchWeatherByCoords(position.coords.latitude,position.coords.longitude);
    });
  }, []);

  const fetchForecast = async (cityName) => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${API_KEY}`
      );
      const dailyData = res.data.list.filter((item) =>
        item.dt_txt.includes("12:00:00")
      );
      setForecastData(dailyData.slice(0, 5));
    } catch (err) {
      console.error("Error fetching forecast:", err);
    }
  };

  const fetchWeatherByCity = async () => {
    if (!city) return;

    setLoading(true);
    setError("");
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      setWeatherData(res.data);
      fetchForecast(city);
    } catch (err) {
      setError("City not found");
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      setWeatherData(res.data);
      fetchForecast(res.data.name);
    } catch (err) {
      setError("Unable to fetch location weather");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      fetchWeatherByCity();
    }
  };
  return (
    <div className="app">
      <h1>Weather App</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Enter city name.."
          value={city}
          onChange={(e)=>setCity(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={fetchWeatherByCity}>Search</button>
      </div>
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {weatherData && <WeatherCard data={weatherData}/>}
      {forecastData.length >0 &&<ForecastCard forecast={forecastData}/>}
    </div>
  );
};

export default App;




