import { useEffect, useState } from "react";

export type Weather = {
  tempC: number;
  humidity: number;
  rainChance: number;
  rainSoon: boolean; // rain expected in next 6 hours
  code: number;
  description: string;
};

// Akurdi, Pune
const LAT = 18.6486;
const LON = 73.7805;

function describe(code: number): string {
  if (code === 0) return "Clear sky";
  if ([1, 2].includes(code)) return "Mainly clear";
  if (code === 3) return "Cloudy";
  if ([45, 48].includes(code)) return "Foggy";
  if ([51, 53, 55].includes(code)) return "Drizzle";
  if ([61, 63, 65].includes(code)) return "Rain";
  if ([66, 67].includes(code)) return "Freezing rain";
  if ([71, 73, 75, 77].includes(code)) return "Snow";
  if ([80, 81, 82].includes(code)) return "Rain showers";
  if ([95, 96, 99].includes(code)) return "Thunderstorm";
  return "—";
}

export function useWeather() {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const url =
      `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${LAT}&longitude=${LON}` +
      `&current=temperature_2m,relative_humidity_2m,weather_code,precipitation` +
      `&hourly=precipitation_probability` +
      `&timezone=Asia%2FKolkata&forecast_days=1`;

    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch(url);
        if (!res.ok) throw new Error("Weather fetch failed");
        const data = await res.json();
        const next6 = (data.hourly?.precipitation_probability ?? []).slice(0, 6) as number[];
        const maxRain = next6.length ? Math.max(...next6) : 0;
        const code = data.current?.weather_code ?? 0;
        if (!cancelled) {
          setWeather({
            tempC: Math.round(data.current?.temperature_2m ?? 0),
            humidity: Math.round(data.current?.relative_humidity_2m ?? 0),
            rainChance: maxRain,
            rainSoon: maxRain >= 60,
            code,
            description: describe(code),
          });
          setError(null);
        }
      } catch (e: unknown) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Unknown error");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    const interval = setInterval(load, 10 * 60_000); // every 10 min
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return { weather, loading, error };
}
