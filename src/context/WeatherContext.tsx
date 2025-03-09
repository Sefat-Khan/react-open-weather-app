import { createContext, useContext, useEffect, useState } from "react";
import useDate from "../hooks/useDate";

// Create a Weather Context to provide weather-related data across the application
const WeatherContext = createContext();

// Custom hook to use WeatherContext easily
export function useWeather() {
  return useContext(WeatherContext);
}

export default function WeatherInfoProvider({ children }) {
  // State variables to store weather-related data
  const [temp, setTemp] = useState(""); // Stores temperature data
  const [areaName, setAreaName] = useState(""); // Stores area name (not currently used)
  const [cityName, setCityName] = useState(""); // Stores the searched city name
  const [countryName, setCountryName] = useState(""); // Stores the country name of the city
  const [windSpeed, setWindSpeed] = useState(""); // Stores wind speed data
  const [humidity, setHumidity] = useState(""); // Stores humidity level
  const [weatherDetails, setWeatherDetails] = useState(""); // Stores the weather description
  const [rainChance, setRainChance] = useState(""); // Stores the probability of rain (cloudiness)
  const [forecast, setForecast] = useState([]); // Stores forecast data for the upcoming days
  const [icon, setIcon] = useState(""); // Stores the weather condition icon URL
  const [date, setDate] = useState(""); // Stores the current date from the API response

  // Custom hook to format date and time
  const { formattedDate, currentTime } = useDate(date);

  // Function to update city name and fetch weather data
  const collectCityName = (cName) => {
    setCityName(cName);
    fetchWeatherData(cName); // Fetch weather data based on city input
  };

  // Function to fetch weather data from OpenWeather API
  async function fetchWeatherData(
    city = null,
    latitude = null,
    longitude = null
  ) {
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY; // OpenWeather API Key
    let apiUrl;

    // Construct API URL based on provided city name or coordinates
    if (city) {
      apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    } else if (latitude !== null && longitude !== null) {
      apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    } else {
      console.error("No location provided for weather data.");
      return;
    }

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch weather data.");
      }

      const data = await response.json();

      // Extract and update weather data from API response
      setTemp(data.list[0].main.temp);
      setCityName(data.city.name);
      setCountryName(data.city.country);
      setDate(data.list[0].dt_txt);
      setAreaName(","); // Placeholder (not being used effectively)
      setHumidity(data.list[0].main.humidity);
      setWindSpeed(data.list[0].wind.speed);
      setWeatherDetails(data.list[0].weather[0].description);
      setRainChance(data.list[0].clouds.all + "%");

      // Set weather condition icon
      const iconCode = data.list[0].weather[0].icon;
      setIcon(`https://openweathermap.org/img/wn/${iconCode}@2x.png`);

      // Process forecast data (filtering for unique days)
      const forecastDays = data.list;
      let lastSeenDate: string | null = null;
      const forecastData = [];

      forecastDays.forEach((day) => {
        const forecastDate = new Date(day.dt_txt);
        const formattedDate = forecastDate.toLocaleDateString("en-US");

        // Only add the first occurrence of each day
        if (formattedDate !== lastSeenDate) {
          lastSeenDate = formattedDate;

          forecastData.push({
            dayName: forecastDate.toLocaleDateString("en-US", {
              weekday: "short",
            }),
            icon: `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`,
            maxTemp: day.main.temp_max,
            minTemp: day.main.temp_min,
          });
        }
      });

      // Update forecast state with next 6 days (excluding today)
      setForecast(forecastData.slice(1, 7));
    } catch (error) {
      console.error("Error fetching WeatherAPI data:", error);
    }
  }

  // Function to get user's geolocation and fetch weather data based on it
  function getGeoLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          fetchWeatherData(null, latitude, longitude);
        },
        ShowError // Handle geolocation errors
      );
    } else {
      alert("Geolocation is not supported by this browser");
    }
  }

  // Function to handle errors in geolocation request
  function ShowError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;
    }
  }

  // Fetch weather data based on user's location when the component mounts
  useEffect(() => {
    getGeoLocation();
  }, []);

  return (
    <WeatherContext.Provider
      value={{
        temp,
        areaName,
        cityName,
        countryName,
        windSpeed,
        humidity,
        rainChance,
        weatherDetails,
        icon,
        formattedDate,
        currentTime,
        getGeoLocation,
        forecast,
        collectCityName,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}
