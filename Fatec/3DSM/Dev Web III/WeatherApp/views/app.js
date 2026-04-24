const form = document.querySelector("#weather-form");
const cityInput = document.querySelector("#city-input");
const searchButton = document.querySelector("#search-button");
const statusMessage = document.querySelector("#status-message");
const weatherCard = document.querySelector("#weather-card");
const quickCityButtons = document.querySelectorAll("[data-city]");

const bodyClassByCondition = {
  Clear: "weather-clear",
  Clouds: "weather-clouds",
  Rain: "weather-rain",
  Drizzle: "weather-rain",
  Thunderstorm: "weather-storm",
  Snow: "weather-snow",
  Mist: "weather-fog",
  Smoke: "weather-fog",
  Haze: "weather-fog",
  Dust: "weather-fog",
  Fog: "weather-fog",
  Sand: "weather-fog",
  Ash: "weather-fog",
  Squall: "weather-storm",
  Tornado: "weather-storm"
};

const metricIcons = {
  feelsLike: "Temp",
  humidity: "H2O"
};

function setLoading(isLoading) {
  searchButton.disabled = isLoading;
  cityInput.disabled = isLoading;
  searchButton.querySelector("span").textContent = isLoading ? "Buscando..." : "Buscar";
  document.body.classList.toggle("is-loading", isLoading);
}

function setStatus(message, type = "info") {
  statusMessage.textContent = message;
  statusMessage.dataset.type = type;
}

function clearWeatherTheme() {
  Object.values(bodyClassByCondition).forEach((className) => {
    document.body.classList.remove(className);
  });
}

function applyWeatherTheme(conditionGroup) {
  clearWeatherTheme();
  document.body.classList.add(bodyClassByCondition[conditionGroup] || "weather-default");
}

function formatCityQuery(value) {
  return value.trim().replace(/\s+/g, " ");
}

function createMetricCard(icon, label, value) {
  const article = document.createElement("article");
  const iconElement = document.createElement("span");
  const labelElement = document.createElement("small");
  const valueElement = document.createElement("strong");

  iconElement.className = "metric-icon";
  iconElement.textContent = icon;
  labelElement.textContent = label;
  valueElement.textContent = value;

  article.append(iconElement, labelElement, valueElement);
  return article;
}

function renderWeather(weather) {
  const condition = weather.condition.charAt(0).toUpperCase() + weather.condition.slice(1);
  const main = document.createElement("div");
  const copy = document.createElement("div");
  const label = document.createElement("span");
  const title = document.createElement("h2");
  const description = document.createElement("p");
  const icon = document.createElement("img");
  const temperatureRow = document.createElement("div");
  const temperature = document.createElement("strong");
  const feelsLike = document.createElement("span");
  const metrics = document.createElement("div");

  weatherCard.replaceChildren();

  main.className = "weather-main";
  label.className = "weather-label";
  label.textContent = "Agora em";
  title.textContent = `${weather.city}, ${weather.country}`;
  description.textContent = condition;
  icon.src = weather.iconUrl;
  icon.alt = `Ícone do clima: ${condition}`;

  temperatureRow.className = "temperature-row";
  temperature.textContent = `${weather.temperature}°C`;
  feelsLike.textContent = `Sensação de ${weather.feelsLike}°C`;

  metrics.className = "metrics-grid";
  metrics.append(
    createMetricCard(metricIcons.feelsLike, "Sensação térmica", `${weather.feelsLike}°C`),
    createMetricCard(metricIcons.humidity, "Umidade", `${weather.humidity}%`)
  );

  copy.append(label, title, description);
  main.append(copy, icon);
  temperatureRow.append(temperature, feelsLike);
  weatherCard.append(main, temperatureRow, metrics);

  weatherCard.classList.remove("hidden");
}

async function fetchWeather(city) {
  const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Não foi possível consultar o clima.");
  }

  return data;
}

async function handleSearch(city) {
  const formattedCity = formatCityQuery(city);

  if (!formattedCity) {
    weatherCard.classList.add("hidden");
    setStatus("Digite o nome de uma cidade antes de buscar.", "error");
    cityInput.focus();
    return;
  }

  setLoading(true);
  setStatus("Consultando dados meteorológicos...", "loading");

  try {
    const weather = await fetchWeather(formattedCity);
    applyWeatherTheme(weather.conditionGroup);
    renderWeather(weather);
    setStatus("Consulta realizada com sucesso.", "success");
  } catch (error) {
    weatherCard.classList.add("hidden");
    clearWeatherTheme();
    setStatus(error.message, "error");
  } finally {
    setLoading(false);
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  handleSearch(cityInput.value);
});

quickCityButtons.forEach((button) => {
  button.addEventListener("click", () => {
    cityInput.value = button.dataset.city;
    handleSearch(button.dataset.city);
  });
});
