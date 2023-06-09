import axios from "axios";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

interface WeatherResponse {
  current_weather:{
    temperature: number;
  };
  daily: {
    weathercode: number;
    temperature_2m_max: number;
    temperature_2m_min: number;
    sunrise: string;
    sunset: string;
    precipitation_probability_max: number;
  };
}

export const serviceRouter = createTRPCRouter({
  weatherapi: publicProcedure.query(async () => {
    const f = await axios.get("https://api.open-meteo.com/v1/forecast/", {
      params: {
        latitude: "52.52",
        longitude: "13.41",
        daily:
          "weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max",
        current_weather: true,
        forecast_days: 1,
        timezone: "Europe/London",
      },
    });
    const response: WeatherResponse = f.data;
    console.log(response.current_weather.temperature);
    console.log(response.daily.sunrise);
    return {
      response,
    };
  }),
});
