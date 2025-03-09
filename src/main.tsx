import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import WeatherInfoProvider from "./context/WeatherContext.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WeatherInfoProvider>
      <App />
    </WeatherInfoProvider>
  </StrictMode>
);
