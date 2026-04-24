import type { OpenWeatherResponse, WeatherData } from "../types/weather";

const OPEN_WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";

export class WeatherServiceError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number = 500
  ) {
    super(message);
    this.name = "WeatherServiceError";
  }
}

export async function getWeatherByCity(city: string): Promise<WeatherData> {
  const apiKey = process.env.API_KEY;

  if (!apiKey || apiKey === "Chave_API") {
    throw new WeatherServiceError(
      "Configure a variável API_KEY no arquivo .env para consultar o clima.",
      500
    );
  }

  const params = new URLSearchParams({
    q: city,
    appid: apiKey,
    units: "metric",
    lang: "pt_br"
  });

  let response: Response;

  try {
    response = await fetch(`${OPEN_WEATHER_URL}?${params.toString()}`);
  } catch {
    throw new WeatherServiceError(
      "Não foi possível conectar ao serviço de clima. Tente novamente em instantes.",
      502
    );
  }

  if (response.status === 404) {
    throw new WeatherServiceError("Cidade não encontrada. Verifique o nome e tente novamente.", 404);
  }

  if (response.status === 401) {
    throw new WeatherServiceError("A chave da API está inválida ou indisponível.", 500);
  }

  if (!response.ok) {
    throw new WeatherServiceError("O serviço de clima retornou uma resposta inesperada.", 502);
  }

  const data = (await response.json()) as OpenWeatherResponse;
  const primaryWeather = data.weather[0];

  if (!primaryWeather) {
    throw new WeatherServiceError("A resposta do serviço de clima veio incompleta.", 502);
  }

  return {
    city: data.name,
    country: data.sys.country,
    temperature: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    humidity: data.main.humidity,
    condition: primaryWeather.description,
    conditionGroup: primaryWeather.main,
    iconUrl: `https://openweathermap.org/img/wn/${primaryWeather.icon}@4x.png`
  };
}
