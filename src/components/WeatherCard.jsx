import React from "react";

const WeatherCard = ({ data }) => {
  const { name, main, weather, wind } = data;
  const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  return (
    <div className="weather-card">
      <h2>{name}</h2>
      <img src={iconUrl} alt={weather[0].description} />
      <h3>{weather[0].main}</h3>
      <p>🌡️ Temp:{main.temp}°C</p>
      <p>💧 Humidity:{main.humidity}%</p>
      <p>🌬️ wind speed: {wind.speed}m/s</p>
    </div>
  );
};

export default WeatherCard;
