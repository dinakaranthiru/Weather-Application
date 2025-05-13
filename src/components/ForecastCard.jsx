import React from "react";
import "./ForecastCard.css";

const ForecastCard = ({ forecast }) => {
  return (
    <div className="forecast-container">
      <h3>5-Day Forecast</h3>
      <div className="forecast-grid">
        {forecast.map((item, index) => (
          <div key={index} className="forecast-card">
            <p>
              {new Date(item.dt_txt).toLocaleDateString("en-IN", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              alt={item.weather[0].description}
            />
            <p>{item.main.temp}°C</p>
            <p>{item.weather[0].main}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastCard;
