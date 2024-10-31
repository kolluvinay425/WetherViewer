export const weatherConditionsMap = {
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

export const getTemperatureIcon = (temperature) => {
  if (temperature > 30) {
    return "https://cdn-icons-png.flaticon.com/512/7084/7084512.png";
  } else if (temperature > 20) {
    return "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather02-512.png";
  } else if (temperature > 10) {
    return "https://img.freepik.com/premium-vector/3d-weather-forecast-icons-summer-sun-with-bright-sunlight-hot-weather-3d-illustration_68708-3829.jpg";
  } else {
    return "https://w7.pngwing.com/pngs/212/586/png-transparent-weather-clouds-snow-winter-weather-color-icon.png";
  }
};
