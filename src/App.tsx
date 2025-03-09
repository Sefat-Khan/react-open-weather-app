import { useState } from "react";
import ForecastCard from "./components/ForecastCard";
import MainCard from "./components/MainCard";
import { useWeather } from "./context/WeatherContext";

function App() {
  // State to store user input for city search
  const [inputInfo, setInputInfo] = useState("");

  // Destructuring the weather context to get functions and state
  const { collectCityName, cityName } = useWeather();

  // Function to handle city search when button is clicked
  const handleSearch = () => {
    if (inputInfo.trim() !== "") {
      collectCityName(inputInfo.toLowerCase()); // Pass city name to context for fetching weather data
      setInputInfo(""); // Clear input field after search
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center item-center bg-[url(/clearSky.jpg)] bg-no-repeat bg-cover bg-center text-black">
      <div className="text-center p-4 bg-transparent">
        <h1 className="mb-6 text-2xl font-bold">Open Weather App</h1>

        <div className="bg-transparent flex justify-center">
          <input
            className="border-0 bg-white/50 rounded-l-[0.2rem] ml-2 px-1 py-1"
            type="text"
            name="cityInput"
            value={inputInfo}
            onChange={(e) => setInputInfo(e.target.value)}
            placeholder="Search for a city name"
          />
          <button
            type="button"
            onClick={handleSearch}
            className="px-1 py-0.5 bg-[rgba(225,225,225,0.18)] shadow-[0 8px 32px 0 rgba(31,38,135,0.37)] cursor-pointer rounded-r-[0.2rem] flex items-center"
          >
            <span className="material-symbols-outlined">search</span>
            Search
          </button>
        </div>

        <div className="flex flex-col gap-y-4 p-4">
          <h2 className="text-2xl font-bold">
            {cityName ? cityName : "CityName"}
          </h2>

          <div className="flex flex-col gap-y-8 items-center lg:flex-row lg:gap-x-4">
            <MainCard />

            <div className="flex flex-col items-center gap-y-4 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-4">
              <ForecastCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
