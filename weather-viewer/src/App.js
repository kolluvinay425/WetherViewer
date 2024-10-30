// src/App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "./components/Search";
import WeatherDisplay from "./components/WeatherDisplay";
import Favorites from "./components/Favorites";
import TemperatureTrend from "./components/TemperatureTrend";
import Navbar from "./components/NavBar";
import LoadingSpinner from "./components/Spinner";

const weatherConditionsMap = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Drizzle: Light",
  53: "Drizzle: Moderate",
  55: "Drizzle: Dense intensity",
  56: "Freezing Drizzle: Light",
  57: "Freezing Drizzle: Dense intensity",
  61: "Rain: Slight",
  63: "Rain: Moderate",
  65: "Rain: Heavy intensity",
  66: "Freezing Rain: Light",
  67: "Freezing Rain: Heavy intensity",
  71: "Snow fall: Slight",
  73: "Snow fall: Moderate",
  75: "Snow fall: Heavy intensity",
  77: "Snow grains",
  80: "Rain showers: Slight",
  81: "Rain showers: Moderate",
  82: "Rain showers: Violent",
  85: "Snow showers: Slight",
  86: "Snow showers: Heavy",
  95: "Thunderstorm: Slight or moderate",
  96: "Thunderstorm with slight hail",
  99: "Thunderstorm with heavy hail",
};
const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [isFetching, setIsFetching] = useState(false);
  const fetchWeather = async (city = city) => {
    if (weather) {
      setWeather(null);
      setIsFetching(true);
    }
    try {
      // Fetch coordinates for the entered city using a Geocoding API
      const geocodeResponse = await axios.get(
        `https://nominatim.openstreetmap.org/search`,
        {
          params: { city, format: "json", limit: 1 },
        }
      );
      const { lat, lon } = geocodeResponse.data[0];

      const weatherResponse = await axios.get(
        "https://api.open-meteo.com/v1/forecast",
        {
          params: {
            latitude: lat,
            longitude: lon,
            hourly:
              "temperature_2m,weathercode,windspeed_10m,relative_humidity_2m",
            start: new Date().toISOString().split("T")[0],
            end: new Date().toISOString().split("T")[0],
          },
        }
      );

      if (weatherResponse.data) {
        console.log("-------->", weatherResponse.data.hourly);
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
        setIsFetching(false);
      }
    } catch (err) {
      alert("invalid city name");
      console.error(err);
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
      <Navbar />
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

        {weather && <TemperatureTrend city={city} />}
      </div>
    </>
  );
};

export default App;
