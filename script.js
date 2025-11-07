const apiKey = "b87f0610a8ac9435040280ba0d14af88"; // 🔑 Replace this with your OpenWeatherMap API key

document.getElementById("getWeather").addEventListener("click", () => {
  const city = document.getElementById("cityInput").value.trim();
  const message = document.getElementById("message");

  if (city === "") {
    message.textContent = "Please enter a city";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error("City not found");
      return response.json();
    })
    .then(data => {
      document.getElementById("cityName").textContent = data.name;
      document.getElementById("temperature").textContent = `${data.main.temp}°F`;
      document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;
      document.getElementById("description").textContent = data.weather[0].description;

      const iconCode = data.weather[0].icon;
      document.querySelector(".icon").innerHTML = `<img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="Weather Icon">`;

      message.textContent = "";
    })
    .catch(error => {
      message.textContent = "City not found. Please try again.";
      document.getElementById("cityName").textContent = "--";
      document.getElementById("temperature").textContent = "--°F";
      document.getElementById("humidity").textContent = "Humidity: --%";
      document.getElementById("description").textContent = "--";
      document.querySelector(".icon").innerHTML = "🌥️";
    });
});
