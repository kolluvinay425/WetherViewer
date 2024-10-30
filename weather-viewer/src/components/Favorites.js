import React, { useState } from "react";
import styled from "styled-components";
import { getWeatherIcon } from "./WeatherDisplay";

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
`;

const FavoriteItem = styled.li`
  background-color: #007bff;
  color: white;
  cursor: pointer;
  border-radius: 10px;
  margin: 10px;
  padding: 15px;
  width: 30%;
  text-align: left;
  transition: all 0.3s ease-in-out;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: #0056b3;
    transform: scale(1.01);
  }
`;

const CollapsibleContent = styled.div`
  display: ${({ isCollapsed }) => (isCollapsed ? "none" : "flex")};
  flex-direction: column;
  align-items: center;
  width: 100%;
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

// Favorites component
const Favorites = ({ favorites, removeFavorite, showWeather }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const weatherIconFun = (temperature) => {
    return getWeatherIcon(temperature);
  };

  return (
    <FavoritesContainer>
      <FavoriteHeader onClick={toggleCollapse}>
        {isCollapsed ? "Show Favorites" : "Hide Favorites"}
      </FavoriteHeader>
      {!isCollapsed && (
        <FavoriteList>
          {favorites.map((weather, index) => (
            <FavoriteItem key={index} onClick={() => showWeather(weather.city)}>
              <WeatherInfo>
                <span>{weather.city}</span>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <WeatherIcon
                    src={weatherIconFun(weather.temperature)}
                    alt="Weather icon"
                  />
                  <span>{weather.temperature} °C</span>
                </div>
                {/* <WeatherDetails> */}
                <div style={{ display: "flex", alignItems: "center" }}>
                  <WeatherIcon
                    src={
                      "https://i.pinimg.com/originals/45/69/9b/45699b2e23cd8359b99430fac758e2ad.png"
                    }
                    alt="wind speed icon"
                  />
                  <span>{weather.windSpeed} m/s</span>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <WeatherIcon
                    src={
                      "https://cdn-icons-png.flaticon.com/512/4888/4888486.png"
                    }
                    alt="wind speed icon"
                  />
                  <span>{weather.humidity} %</span>
                </div>

                {/* </WeatherDetails> */}
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
