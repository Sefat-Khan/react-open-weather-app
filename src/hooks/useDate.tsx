import { useEffect, useState } from "react";

export default function useFormattedDateTime(dateString) {
  const [formattedDate, setFormattedDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    if (dateString) {
      const formatted = new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      setFormattedDate(formatted);
    }
  }, [dateString]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return { formattedDate, currentTime };
}
