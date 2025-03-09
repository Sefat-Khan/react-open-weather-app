Open Weather App

A simple and responsive weather application that fetches and displays weather data using the OpenWeatherMap API. Users can search for a city to view the current weather and a forecast.

Features

Search for any city's weather.

Display current weather conditions.

Show a 5-day forecast.

Responsive design for different screen sizes.

Technologies Used

React - Frontend framework.

Tailwind CSS - Styling.

Context API - State management.

OpenWeatherMap API - Fetching weather data.

Installation & Setup

Clone the repository:

git clone (https://github.com/Sefat-Khan/react-open-weather-app.git)
cd weather-app

Install dependencies:

npm install

Create a .env file in the root directory and add your OpenWeatherMap API key:

REACT_APP_WEATHER_API_KEY=your_api_key_here

Start the development server:

npm run dev

Project Structure

weather-app/
│-- src/
│ │-- components/
│ │ │-- ForecastCard.jsx
│ │ │-- MainCard.jsx
│ │-- context/
│ │ │-- WeatherContext.jsx
│ │-- App.jsx
│ │-- main.jsx
│-- public/
│ │-- clearSky.jpg
│-- .env
│-- package.json
│-- README.md

How It Works

The user enters a city name in the search bar.

The app fetches weather data using the OpenWeatherMap API.

The current weather and forecast are displayed dynamically.

The app updates the background based on weather conditions.

API Reference

This project uses the OpenWeatherMap API to fetch real-time weather data.

Endpoint for current weather:

https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}&units=metric

Endpoint for forecast:

https://api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}&units=metric

Future Improvements

Implement geolocation-based weather fetching.

Add hourly forecast details.

Author

Md. Sefat Khan GitHub
