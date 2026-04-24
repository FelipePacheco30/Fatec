import { Router } from "express";
import type { ApiErrorResponse, WeatherData } from "../types/weather";
import { getWeatherByCity, WeatherServiceError } from "../services/weather.service";

export const weatherRouter = Router();

weatherRouter.get<unknown, WeatherData | ApiErrorResponse>("/weather", async (request, response) => {
  const cityQuery = request.query.city;

  if (typeof cityQuery !== "string") {
    return response.status(400).json({
      message: "Digite o nome de uma cidade para consultar o clima."
    });
  }

  const city = cityQuery.trim();

  if (!city) {
    return response.status(400).json({
      message: "Digite o nome de uma cidade para consultar o clima."
    });
  }

  if (city.length > 80) {
    return response.status(400).json({
      message: "O nome da cidade deve ter no máximo 80 caracteres."
    });
  }

  try {
    const weather = await getWeatherByCity(city);
    return response.json(weather);
  } catch (error) {
    if (error instanceof WeatherServiceError) {
      return response.status(error.statusCode).json({ message: error.message });
    }

    return response.status(500).json({
      message: "Erro inesperado ao consultar o clima."
    });
  }
});
