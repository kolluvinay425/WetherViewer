import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const GraphContainer = styled.div`
  width: 50%;
  margin: 20px auto;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const TemperatureTrend = ({ city }) => {
  const [hourlyTemperatures, setHourlyTemperatures] = useState([]);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
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
              hourly: "temperature_2m",
              start: new Date().toISOString().split("T")[0],
              end: new Date().toISOString().split("T")[0],
            },
          }
        );

        setHourlyTemperatures(weatherResponse.data.hourly.temperature_2m);
        setWeatherData(city);
      } catch (err) {
        console.error(err);
      }
    };

    fetchWeather();
  }, [city]);

  const getTimeLabels = () => {
    const labels = [];
    const currentHour = new Date().getHours();
    for (let i = 0; i < 24; i++) {
      labels.push(`${(currentHour + i + 1) % 24}:00`);
    }
    return labels;
  };

  const createGradient = (ctx, area) => {
    const colorStart = "rgba(75, 192, 192, 0.5)";
    const colorEnd = "rgba(75, 192, 192, 0.1)";

    const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);
    gradient.addColorStop(0, colorStart);
    gradient.addColorStop(1, colorEnd);

    return gradient;
  };

  return (
    <GraphContainer>
      {hourlyTemperatures.length > 0 && (
        <Line
          data={{
            labels: getTimeLabels(),
            datasets: [
              {
                label: `Temperature Trend for ${city}`,
                data: hourlyTemperatures,
                fill: true,
                backgroundColor: (context) => {
                  const { ctx, chartArea } = context.chart;
                  if (!chartArea) {
                    // This case happens on initial chart load
                    return null;
                  }
                  return createGradient(ctx, chartArea);
                },
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 2,
                pointRadius: 3,
                pointBackgroundColor: "rgba(75, 192, 192, 1)",
                pointBorderColor: "#fff",
                tension: 0.4,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: true,
                labels: {
                  color: "rgba(75, 192, 192, 1)",
                },
              },
              tooltip: {
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                titleColor: "#fff",
                bodyColor: "#fff",
                footerColor: "#fff",
              },
            },
            scales: {
              x: {
                grid: {
                  display: false,
                },
                ticks: {
                  color: "#007bff",
                },
              },
              y: {
                grid: {
                  color: "#007bff",
                },
                ticks: {
                  color: "#007bff",
                },
              },
            },
          }}
        />
      )}
    </GraphContainer>
  );
};

export default TemperatureTrend;
