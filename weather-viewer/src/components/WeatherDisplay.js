import React from "react";
import styled from "styled-components";
import { getTemperatureIcon } from "../helpers";
const WeatherContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
`;

const Card = styled.div`
  background: linear-gradient(135deg, #72edf2 10%, #5151e5 100%);
  border-radius: 10px;
  padding: 20px;
  width: 200px;
  text-align: center;
  color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  height: 200px;
  &:hover {
    background-color: #0056b3;
    transform: scale(1.01);
  }
`;

const CityHeader = styled.h2`
  width: 100%;
  text-align: center;
  color: #007bff;
`;

const WeatherInfo = styled.p`
  font-size: 1.2em;
  text-align: center;
`;
const WeatherIcon = styled.img`
  width: 100px;
  height: 100px;
  margin: 0 auto;
`;

const AddButton = styled.button`
  padding: 10px 20px;
  font-size: 1em;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

// export const getWeatherIcon = (temperature) => {
//   if (temperature > 30) {
//     return "https://cdn-icons-png.flaticon.com/512/7084/7084512.png";
//   } else if (temperature > 20) {
//     return "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather02-512.png";
//   } else if (temperature > 10) {
//     return "https://img.freepik.com/premium-vector/3d-weather-forecast-icons-summer-sun-with-bright-sunlight-hot-weather-3d-illustration_68708-3829.jpg";
//   } else {
//     return "https://w7.pngwing.com/pngs/212/586/png-transparent-weather-clouds-snow-winter-weather-color-icon.png";
//   }
// };

// const getWeatherIcon = getTemperatureIcon(temperature);

const WeatherDisplay = ({ weather, addFavorite }) => {
  const { temperature, weatherConditions, humidity, windSpeed, city } = weather;
  const weatherIcon = getTemperatureIcon(temperature);

  return (
    <div>
      <CityHeader>{city} Weather Info</CityHeader>
      <WeatherContainer>
        <Card>
          <WeatherIcon src={weatherIcon} alt="Weather icon" />
          <WeatherInfo>{temperature}°C</WeatherInfo>
          <WeatherInfo> {weatherConditions}</WeatherInfo>
        </Card>

        <Card>
          <WeatherIcon
            src={"https://cdn-icons-png.flaticon.com/512/4888/4888486.png"}
            alt="Weather icon"
          />
          <WeatherInfo>Humidity: {humidity} %</WeatherInfo>
        </Card>
        <Card>
          <WeatherIcon
            src={
              "https://i.pinimg.com/originals/45/69/9b/45699b2e23cd8359b99430fac758e2ad.png"
            }
            alt="Weather icon"
          />
          <WeatherInfo>Wind Speed: {windSpeed} km/h</WeatherInfo>
        </Card>
      </WeatherContainer>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <AddButton onClick={() => addFavorite(weather)}>
          Add to Favorites
        </AddButton>
      </div>
    </div>
  );
};

export default WeatherDisplay;
