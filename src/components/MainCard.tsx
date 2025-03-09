import { useState } from "react";
import { useWeather } from "../context/WeatherContext";

export default function MainCard() {
  // Extract weather-related data from the WeatherContext
  const {
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
  } = useWeather();

  // State to toggle temperature unit between Celsius and Fahrenheit
  const [isCelsius, setIsCelsius] = useState(true);

  // Function to convert Celsius to Fahrenheit
  const convertToFahrenheit = (celsius: number) =>
    celsius ? (celsius * 9) / 5 + 32 : 32;

  // Function to toggle the temperature unit on click
  const toggleTemperature = () => {
    setIsCelsius(!isCelsius);
  };

  // store the displayed temperature based on the selected unit
  const displayedTemp = isCelsius ? temp : convertToFahrenheit(temp).toFixed(2);

  return (
    <>
      <div className="w-[19rem] rounded-[0.5rem] bg-[rgba(225,225,225,0.18)] shadow-[0 8px 32px 0 rgba(31,38,135,0.37)] p-6 flex flex-col gap-y-4">
        <h3 className="text-2xl font-bold">Today</h3>

        <div className="flex justify-between">
          <img src={icon} alt={weatherDetails} />
          <span
            className="text-xl font-bold cursor-pointer"
            onClick={toggleTemperature}
          >
            {displayedTemp}°{isCelsius ? "C" : "F"}
          </span>
        </div>

        <div className="flex flex-col justify-between text-lg">
          <h4>
            {cityName}
            {areaName}
            {countryName}
          </h4>
          <div className="flex justify-around">
            <p>{formattedDate}</p>
            <span>{currentTime}</span>
          </div>
        </div>

        <div className="flex justify-around text-lg">
          <div className="rounded-[0.5rem] bg-blue-400 px-3 py-2">
            <span className="material-symbols-outlined">air</span>
            <p>Wind Speed</p>
            <span>{windSpeed}m/s</span>
          </div>
          <div className="rounded-[0.5rem] bg-green-300 px-3 py-2">
            <span className="material-symbols-outlined">humidity_mid</span>
            <p>Humidity</p>
            <span>{humidity}%</span>
          </div>
        </div>

        <div className="flex justify-between text-lg">
          <div className="flex items-center gap-x-1">
            <span className="material-symbols-outlined">cloud</span>
            <p>Weather Details</p>
          </div>
          <p>{weatherDetails}</p>
        </div>

        <hr />

        <div className="flex justify-between text-lg">
          <div className="flex items-center gap-x-1">
            <span className="material-symbols-outlined">water_drop</span>
            <p>Rain Chance</p>
          </div>
          <span>{rainChance}</span>
        </div>
      </div>
    </>
  );
}
