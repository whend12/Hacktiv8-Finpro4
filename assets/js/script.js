document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.querySelector(".search");
  const searchButton = document.querySelector("#button-search");
  const cityName = document.querySelector(".city");
  const condition = document.querySelector(".condition");
  const temperature = document.querySelector(".temp");
  const windSpeed = document.querySelector(".wind");
  const dayElement = document.querySelector(".day");
  const dateElement = document.querySelector(".date");

  searchButton.addEventListener("click", function () {
    const location = searchInput.value;
    if (location.trim() !== "") {
      getWeatherData(location).then(() => {
        getWeatherForecast(location);
      });
      searchInput.value = "";
    } else {
      alert("Location cannot be empty");
    }
  });

  async function getWeatherData(location) {
    const apiKey = "c948d01ae05d6e908757ceeb70784246";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      updateWeatherUI(data);
      updateDayAndDate();
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }

  function updateWeatherUI(data) {
    if (data.name) {
      cityName.textContent = data.name;

      if (data.weather && data.weather[0] && data.weather[0].description) {
        condition.textContent = data.weather[0].description;
      } else {
        console.error("Weather data not available");
      }

      if (data.main && data.main.temp) {
        temperature.textContent = data.main.temp + "°C";
      } else {
        console.error("Temperature data not available");
      }

      if (data.wind && data.wind.speed) {
        windSpeed.textContent = data.wind.speed + " Km/h";
      } else {
        console.error("Wind speed data not available");
      }
    } else {
      alert("City name not available");
    }
  }

  function updateDayAndDate() {
    const currentDate = new Date();
    dayElement.textContent = currentDate.toLocaleDateString("en-US", {
      weekday: "long",
    });
    dateElement.textContent = currentDate.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }
  updateDayAndDate();

  async function getWeatherForecast(location) {
    const apiKey = "c948d01ae05d6e908757ceeb70784246";
    const geocodingUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;

    try {
      const geoResponse = await fetch(geocodingUrl);
      const geoData = await geoResponse.json();

      const { coord } = geoData;
      const { lat, lon } = coord;

      const apiForecastUrl = `https://api.openweathermap.org/data/2.5/forecast/?lat=${lat}&lon=${lon}&appid=${apiKey}`;
      const uniqueForecastUrl = [];

      const forecastResponse = await fetch(apiForecastUrl);
      const forecastData = await forecastResponse.json();
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const fiveDayForecast = forecastData.list.filter((item) => {
        const date = new Date(item.dt_txt.split(" ")[0]);
        date.setHours(0, 0, 0, 0);
        if (
          date > today &&
          !uniqueForecastUrl.includes(date.toISOString().split("T")[0])
        ) {
          uniqueForecastUrl.push(date.toISOString().split("T")[0]);
          return true;
        }
        return false;
      });

      const dayIcons = document.querySelectorAll(".day_icon");
      const dayTemps = document.querySelectorAll(".day_temps");
      const dayNames = document.querySelectorAll(".day_name");

      // Loop untuk menampilkan ikon,hari dan  suhu pada elemen HTML
      fiveDayForecast.forEach((forecast, index) => {
        const iconCode = forecast.weather[0].icon;
        const temperature = (forecast.main.temp / 10).toFixed(2);
        const date = new Date(forecast.dt_txt);
        const dayName = date.toLocaleDateString("en-US", { weekday: "long" });

        dayIcons[
          index
        ].innerHTML = `<img src="https://openweathermap.org/img/w/${iconCode}.png" alt="Weather Icon">`;
        dayTemps[index].textContent = temperature + "°C";
        dayNames[index].textContent = dayName;
      });
    } catch (error) {
      console.error("Error fetching weather forecast:", error);
    }
  }
});
