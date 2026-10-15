import axios from "axios";
import chalk from "chalk";

const API_KEY = "45a1a67dfc2b3458b5577cfb1ddcad5c";

function displayWeather(weatherData) {
  console.log(
    chalk.yellow(
      `El clima en ${weatherData.name} es ${weatherData.weather[0].description}.`,
    ),
  );
  console.log(chalk.cyan(`Temperatura: ${weatherData.main.temp}°C`));
  console.log(chalk.cyan(`Humedad: ${weatherData.main.humidity}°C`));
}

async function getWeather(city) {
  try {
    let endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
    const response = await axios.get(endpoint, {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric",
      },
    });

    console.log(response.data);
    // return response.data;
  } catch (error) {
    console.error("Error al obtener el clima: ", error.message);
  }
}

function initApp() {
  let city = process.argv[2];

  if (!city) {
    console.log(
      chalk.red(
        "Proporciona la ciudad mediante el siguiente comando: node app.js [ciudad]",
      ),
    );
    return;
  }
  getWeather(city)
    .then((weather) => displayWeather(weather))
    .catch((error) =>
      console.error("Error al obtener el clima: ", error.message),
    );
}

initApp();
