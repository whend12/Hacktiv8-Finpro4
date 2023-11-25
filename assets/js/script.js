document.addEventListener("DOMContentLoaded", function () {
  // Selecting elements
  const searchInput = document.querySelector(".search");
  const searchButton = document.querySelector("#button-search");
  const cityName = document.querySelector(".city");
  const condition = document.querySelector(".condition");
  const temperature = document.querySelector(".temp");
  const windSpeed = document.querySelector(".wind");
  const dayElement = document.querySelector(".day"); 
  const dateElement = document.querySelector(".date"); 
  const dayNames = document.querySelectorAll(".day_temp");

  // Event listener for the search button
  searchButton.addEventListener("click", function () {
    const location = searchInput.value;
    if (location.trim() !== "") {
      getWeatherData(location);
    } else {
      console.error("Location cannot be empty");
    }
  });

  // Function to fetch weather data from the API
  async function getWeatherData(location) {
    const apiKey = "c948d01ae05d6e908757ceeb70784246";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      console.log("API Response:", data);

      updateWeatherUI(data);
      updateDayAndDate();
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }

  // Function to update the UI with weather data
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
      console.error("City name not available");
    }
  }

  // Function to update day and date in real-time
  function updateDayAndDate() {
    const currentDate = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    dayElement.textContent = currentDate.toLocaleDateString("en-US", {
      weekday: "long",
    });
    dateElement.textContent = currentDate.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  // Initial call to set day and date
  updateDayAndDate();
});
