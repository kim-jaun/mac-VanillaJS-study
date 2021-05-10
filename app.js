window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let locationCountry = locationTimezone.querySelector(".location-country");
  let locationCity = locationTimezone.querySelector(".location-city");
  let location = document.querySelector(".location");
  let locationIcon = location.querySelector(".location-Icon");
  let temperatureSection = document.querySelector(".temperature");
  const temperatureSpan = document.querySelector(".temperature span");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const API_KEY = "d3b0dac55021007f8fcc48667c9c5777";
      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`;
      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          const { temp } = data.main;
          const { description, icon } = data.weather[0];
          const { country } = data.sys;

          //Set DOM Elements from the API
          temperatureDegree.textContent = temp;
          temperatureDescription.textContent = description;
          locationCountry.textContent = country;
          locationCity.textContent = data.name;
          //FORUMULA FOR CELSIUS
          let celsius = temp * 1.8 + 32;
          //Set Icon
          function weatherIconFunction() {
            const weatherIcon = `https://openweathermap.org/img/wn/${icon}@2x.png`;
            const wimg = document.createElement("img");
            wimg.src = weatherIcon;
            locationIcon.appendChild(wimg);
          }
          weatherIconFunction();

          //Change temperature to Celsius/Farenheit
          temperatureSection.addEventListener("click", () => {
            if (temperatureSpan.textContent === "C") {
              temperatureSpan.textContent = "F";
              temperatureDegree.textContent = Math.floor(celsius);
            } else {
              temperatureSpan.textContent = "C";
              temperatureDegree.textContent = temp;
            }
          });
        });
    });
  }
});
