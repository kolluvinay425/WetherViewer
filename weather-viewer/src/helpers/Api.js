import axios from "axios";
const fetchWeatherData = async (city) => {
  try {
    // Fetch coordinates for the entered city using a Geocoding API
    const geocodeResponse = await axios.get(
      `https://nominatim.openstreetmap.org/search`,
      {
        params: { city, format: "json", limit: 1 },
      }
    );
    console.log(geocodeResponse);
    if (geocodeResponse.data.length === 0) {
      alert("City not found");
    }

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

    return weatherResponse;
  } catch (err) {
    console.error(err);
  }
};

export { fetchWeatherData };
