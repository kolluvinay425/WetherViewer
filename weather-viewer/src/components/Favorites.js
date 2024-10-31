import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getTemperatureIcon } from "../helpers";
import { fetchHourlyWeatherData } from "../helpers/Api";

// Styled components
const FavoritesContainer = styled.div`
  margin: 20px;
  text-align: center;
  font-family: "Arial", sans-serif;
`;

const FavoriteHeader = styled.h2`
  cursor: pointer;
  color: #007bff;
  margin-bottom: 10px;
  &:hover {
    color: #0056b3;
  }
`;

const FavoriteList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0;
`;

const FavoriteItem = styled.li`
  background-color: #007bff;
  color: white;
  cursor: pointer;
  border-radius: 10px;
  margin: 10px;
  padding: 15px;
  width: 80%;
  text-align: left;
  transition: all 0.3s ease-in-out;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (min-width: 768px) {
    width: 60%;
  }

  @media (min-width: 1024px) {
    width: 40%;
  }

  &:hover {
    background-color: #0056b3;
    transform: scale(1.01);
  }
`;

const WeatherIcon = styled.img`
  width: 50px;
  height: 50px;
  margin: 0 10px;
`;

const WeatherInfo = styled.div`
  font-size: 1em;
  margin: 5px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  width: 100%;
`;

const RemoveButton = styled.button`
  background: red;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  margin-top: 10px;
  &:hover {
    background: darkred;
  }
`;

const SortButton = styled.button`
  background-color: #007bff;
  width: 32%;
  color: white;
  border: none;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 15px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

// Favorites component
const Favorites = ({ favorites, removeFavorite, showWeather }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [cityFavorites, setCityFavorites] = useState([...favorites]);

  useEffect(() => {
    setCityFavorites([...favorites]);
  }, [favorites]);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const weatherIconFun = (temperature) => {
    return getTemperatureIcon(temperature);
  };

  const sortFavoritesByTemperature = () => {
    const sorted = !isSorted
      ? [...cityFavorites].sort((a, b) => a.temperature - b.temperature)
      : [...favorites];
    setCityFavorites(sorted);
    setIsSorted(!isSorted);
  };

  return (
    <FavoritesContainer>
      <FavoriteHeader onClick={toggleCollapse}>
        {isCollapsed ? "Show Favorites" : "Hide Favorites"}
      </FavoriteHeader>
      {!isCollapsed && cityFavorites.length > 1 && (
        <SortButton onClick={sortFavoritesByTemperature}>
          {isSorted ? "Revert Back" : "Sort by Temperature"}
        </SortButton>
      )}
      {!isCollapsed && (
        <FavoriteList>
          {cityFavorites.map((weather, index) => (
            <FavoriteItem key={index} onClick={() => showWeather(weather.city)}>
              <WeatherInfo>
                <span>{weather.city}</span>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <WeatherIcon
                    src={weatherIconFun(weather.temperature)}
                    alt="Weather icon"
                  />
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ paddingBottom: "2px" }}>
                      {weather.temperature} °C
                    </span>
                    <span>{weather.weatherConditions}</span>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <WeatherIcon
                    src={
                      "https://i.pinimg.com/originals/45/69/9b/45699b2e23cd8359b99430fac758e2ad.png"
                    }
                    alt="Wind speed icon"
                  />
                  <span>{weather.windSpeed} m/s</span>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <WeatherIcon
                    src={
                      "https://cdn-icons-png.flaticon.com/512/4888/4888486.png"
                    }
                    alt="Humidity icon"
                  />
                  <span>{weather.humidity} %</span>
                </div>
                <RemoveButton
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFavorite(weather);
                  }}
                >
                  Remove
                </RemoveButton>
              </WeatherInfo>
            </FavoriteItem>
          ))}
        </FavoriteList>
      )}
    </FavoritesContainer>
  );
};

export default Favorites;
