import React from 'react';
import { useWeather } from './Context/Context';

function App_Key() {

  const { weatherData, setWeatherData } = useWeather();
  console.log(weatherData);

  return (
    <div className="result">
      
      {weatherData.map(item => (
        <div className="price" key={item.date}>
          <div className="week">
            <span>{item.date}</span>
          </div>

          <div className="image">
            <img src={item.day.condition.icon} alt="Weather" />
          </div>

          <div className="weather">
            <div>
              Min Sıcaklık
              <span>{item.day.mintemp_c}°</span>
            </div>
            <div>
              Max Sıcaklık
              <span>{item.day.maxtemp_c}°</span>
            </div>
          </div>
        </div>
      ))}
      
    </div>
  );
}

export default App_Key;