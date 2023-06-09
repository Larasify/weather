import { TRPCError } from "@trpc/server";
import axios, { AxiosResponse } from "axios";
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
    const f: AxiosResponse<WeatherResponse> = await axios.get("https://api.open-meteo.com/v1/forecast/", {
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
    if (f.status !== 200) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Weather API is not working"})
    }
    if (!f.data) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Weather API is not working"})
    }
    const response: WeatherResponse = f.data;
    //validate response
    if(!response.daily.weathercode || !response.daily.temperature_2m_max || !response.daily.temperature_2m_min || !response.daily.sunrise || !response.daily.sunset || !response.daily.precipitation_probability_max || !response.current_weather.temperature) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Weather returned wrong thing?!?!"})
    }

    const limitedResponse = {
      current_weather: {
        temperature: response.current_weather.temperature,
      },
      daily: {
        weathercode: response.daily.weathercode,
        temperature_2m_max: response.daily.temperature_2m_max,
        temperature_2m_min: response.daily.temperature_2m_min,
        sunrise: response.daily.sunrise,
        sunset: response.daily.sunset,
        precipitation_probability_max: response.daily.precipitation_probability_max,
      },
    }
    
    return {
      limitedResponse,
    };
  }),
});
