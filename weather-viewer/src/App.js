// src/App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "./components/Search";
import WeatherDisplay from "./components/WeatherDisplay";
import Favorites from "./components/Favorites";
import TemperatureTrend from "./components/TemperatureTrend";
import Navbar from "./components/styled/NavBar";
import LoadingSpinner from "./components/styled/Spinner";
import AnimatedBackground from "./components/styled/Background";
import { fetchWeatherData } from "./helpers/Api";
import { weatherConditionsMap } from "./helpers";

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [isFetching, setIsFetching] = useState(false);
  const [hourlyTemperatures, setHourlyTemperatures] = useState([]);

  const reset = () => {
    setHourlyTemperatures([]);
    setIsFetching(false);
    setWeather(null);
  };

  const fetchWeather = async (city) => {
    if (weather) {
      setWeather(null);
      setHourlyTemperatures(null);
    }
    setIsFetching(true);

    try {
      // Fetch coordinates for the entered city using a Geocoding API
      const weatherResponse = await fetchWeatherData(city);

      if (weatherResponse.data) {
        const weatherCode = weatherResponse.data.hourly.weathercode[0];
        const weatherDescription =
          weatherConditionsMap[weatherCode] || "Unknown";
        setWeather({
          city,
          temperature: weatherResponse.data.hourly.temperature_2m[0],

          humidity: weatherResponse.data.hourly.relative_humidity_2m[0],

          weatherConditions: weatherDescription,
          windSpeed: weatherResponse.data.hourly.windspeed_10m[0],
        });
        setHourlyTemperatures(weatherResponse.data.hourly.temperature_2m);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsFetching(false);
    }
  };

  const addFavorite = (weather) => {
    const hasDuplicateCity = (list, cityName) => {
      return list.some((item) => item.city === cityName);
    };
    if (!hasDuplicateCity(favorites, weather.city)) {
      const updatedFavorites = [...favorites, weather];
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      alert("city is already in favorites list");
    }
  };

  const removeFavorite = (city) => {
    const updatedFavorites = favorites.filter((fav) => fav !== city);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const favoritesLength = favorites.length > 0;

  return (
    <>
      <AnimatedBackground />
      <Navbar reset={reset} />
      <div style={{ marginTop: "50px" }}>
        <Search city={city} setCity={setCity} fetchWeather={fetchWeather} />

        {weather && (
          <WeatherDisplay weather={weather} addFavorite={addFavorite} />
        )}
        {isFetching && <LoadingSpinner />}

        {favoritesLength && (
          <Favorites
            favorites={favorites}
            removeFavorite={removeFavorite}
            showWeather={fetchWeather}
          />
        )}

        {weather && (
          <TemperatureTrend
            city={weather.city}
            hourlyTemperatures={hourlyTemperatures}
          />
        )}
      </div>
    </>
  );
};

export default App;
