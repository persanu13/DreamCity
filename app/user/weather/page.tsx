import WeatherDisplay from "@/app/ui/user/weather/weatherdisplay";

export default function WeatherPage() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Prognoză meteo Brașov </h1>
      <WeatherDisplay />
    </main>
  );
}
