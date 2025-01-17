"use client";

import { useEffect, useState } from "react";

interface WeatherData {
  current: {
    temperature_2m: number;
    is_day: number;
    precipitation: number;
    weather_code: number;
    wind_speed_10m: number;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    precipitation_probability: number[];
    precipitation: number[];
    weather_code: number[];
    cloud_cover: number[];
    visibility: number[];
    wind_speed_120m: number[];
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    sunrise: string[];
    sunset: string[];
    precipitation_sum: number[];
    precipitation_hours: number[];
  };
}

const API_URL =
  "https://api.open-meteo.com/v1/forecast?latitude=45.6486&longitude=25.6061&current=temperature_2m,is_day,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,precipitation_probability,precipitation,weather_code,cloud_cover,visibility,wind_speed_120m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,precipitation_hours&timezone=auto";

function WeatherDisplay() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data);
        setIsLoading(false);
      })
      .catch(() => {
        setError("Nu s-a putut încărca datele meteo");
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div className="text-center p-4">Se încarcă datele meteo...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  if (!weatherData) {
    return <div className="text-center p-4">Nu există date meteo disponibile</div>;
  }

  const getWeatherDescription = (code: number) => {
    const descriptions: { [key: number]: string } = {
      0: "Cer senin",
      1: "Mai mult senin",
      2: "Parțial înnorat",
      3: "Noros",
      45: "Ceață",
      48: "Ceață cu chiciură",
      51: "Burniță ușoară",
      53: "Burniță moderată",
      55: "Burniță densă",
      61: "Ploaie ușoară",
      63: "Ploaie moderată",
      65: "Ploaie abundentă",
      71: "Ninsoare ușoară",
      73: "Ninsoare moderată",
      75: "Ninsoare abundentă",
    };
    return descriptions[code] || "Necunoscut";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ro-RO", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("ro-RO", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-8">
      <section className="bg-gray-100 p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-2">Vremea curentă</h2>
        <p>Temperatură: {weatherData.current.temperature_2m}°C</p>
        <p>Precipitații: {weatherData.current.precipitation} mm</p>
        <p>Viteza vântului: {weatherData.current.wind_speed_10m} km/h</p>
        <p>Stare meteo: {getWeatherDescription(weatherData.current.weather_code)}</p>
        <p>{weatherData.current.is_day ? "Zi" : "Noapte"}</p>
      </section>

      <section className="bg-gray-100 p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-2">Prognoza orară</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 text-left">Ora</th>
                <th className="p-2 text-left">Temperatură (°C)</th>
                <th className="p-2 text-left">Probabilitate precipitații (%)</th>
                <th className="p-2 text-left">Stare meteo</th>
              </tr>
            </thead>
            <tbody>
              {weatherData.hourly.time.slice(0, 24).map((time, index) => (
                <tr key={time} className="border-b border-gray-200">
                  <td className="p-2">{formatTime(time)}</td>
                  <td className="p-2">{weatherData.hourly.temperature_2m[index]}</td>
                  <td className="p-2">
                    {weatherData.hourly.precipitation_probability[index]}
                  </td>
                  <td className="p-2">
                    {getWeatherDescription(weatherData.hourly.weather_code[index])}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-gray-100 p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-2">Prognoza zilnică</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 text-left">Data</th>
                <th className="p-2 text-left">Temp. maximă (°C)</th>
                <th className="p-2 text-left">Temp. minimă (°C)</th>
                <th className="p-2 text-left">Stare meteo</th>
                <th className="p-2 text-left">Precipitații totale (mm)</th>
              </tr>
            </thead>
            <tbody>
              {weatherData.daily.time.map((time, index) => (
                <tr key={time} className="border-b border-gray-200">
                  <td className="p-2">{formatDate(time)}</td>
                  <td className="p-2">{weatherData.daily.temperature_2m_max[index]}</td>
                  <td className="p-2">{weatherData.daily.temperature_2m_min[index]}</td>
                  <td className="p-2">
                    {getWeatherDescription(weatherData.daily.weather_code[index])}
                  </td>
                  <td className="p-2">{weatherData.daily.precipitation_sum[index]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default WeatherDisplay;
