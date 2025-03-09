import { useWeather } from "../context/WeatherContext";

export default function ForecastCard() {
  // Extract forecast data from the WeatherContext
  const { forecast } = useWeather();

  return (
    <>
      {/* Check if forecast data exists and map through each day's forecast */}
      {forecast?.map((e, i) => (
        <div
          key={i}
          className="h-[18rem] w-[12rem] rounded-[0.5rem] bg-[rgba(225,225,225,0.18)] shadow-[0 8px 32px 0 rgba(31,38,135,0.37)] 
          text-lg flex flex-col justify-between p-4 items-center"
        >
          <h4>{e.dayName}</h4>

          <hr className="w-[100%]" />

          <img src={e.icon} alt="weather icon" />

          <span>
            {e.maxTemp}°C/{e.minTemp}°C
          </span>
        </div>
      ))}
    </>
  );
}
