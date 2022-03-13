import React, { createContext, useContext, useState } from 'react';

const WeatherContext = createContext();

export const WeatherProvider = ({children}) => {

  const APP_KEY = "20b6ab3bc821401dbcc93127222402";      // Fetch etmek için gereken api kodu

  const [weatherData, setWeatherData] = useState([]);
  
  async function getData(city) {                         // async/await ile kodun senkronize olmasını sağlayalım
    const data = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${APP_KEY}&q=${city}&days=7`);

    const result = await data.json();                    // gelen veriyi json formatına dönüştürelim
    setWeatherData(result.forecast.forecastday);
  };
  
  const values = {
    weatherData,
    setWeatherData,
    getData
  };


  return (
    <WeatherContext.Provider value={values}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => useContext(WeatherContext);
