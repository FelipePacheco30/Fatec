const form = document.getElementById("weather-form");
const cityInput = document.getElementById("city-input");
const feedback = document.getElementById("feedback");
const result = document.getElementById("result");

const clearResult = () => {
  result.style.display = "none";
  result.replaceChildren();
};

const renderWeather = (data) => {
  const title = document.createElement("h2");
  title.textContent = `${data.city}, ${data.country}`;

  const weatherMain = document.createElement("div");
  weatherMain.className = "weather-main";

  const temperature = document.createElement("span");
  temperature.className = "temperature";
  temperature.textContent = `${Math.round(data.temperature)}°C`;

  const icon = document.createElement("img");
  icon.src = data.iconUrl;
  icon.alt = data.condition;

  weatherMain.append(temperature, icon);

  const details = document.createElement("div");
  details.className = "details";

  const detailItems = [
    ["Sensação térmica:", `${Math.round(data.feelsLike)}°C`],
    ["Umidade:", `${data.humidity}%`],
    ["Condição:", data.condition],
  ];

  detailItems.forEach(([label, value]) => {
    const item = document.createElement("p");
    const strong = document.createElement("strong");

    strong.textContent = label;
    item.append(strong, document.createTextNode(` ${value}`));
    details.append(item);
  });

  result.replaceChildren(title, weatherMain, details);
  result.style.display = "block";
};

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const city = cityInput.value.trim();
  feedback.textContent = "";
  clearResult();

  if (!city) {
    feedback.textContent = "Digite o nome de uma cidade.";
    return;
  }

  try {
    const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
    const payload = await response.json();

    if (!response.ok) {
      feedback.textContent = payload.error || "Não foi possível buscar o clima.";
      return;
    }

    renderWeather(payload);
  } catch (_error) {
    feedback.textContent = "Erro de conexão. Tente novamente.";
  }
});
