const api = "796e49c31eb5f9f1eab7e1b1d7771e71";

const iconImg = document.getElementById("weather_icon");
const loc = document.querySelector("#location");
const tempC = document.querySelector(".c");
const tempF = document.querySelector(".f");
const desc = document.querySelector(".desc");
const sunriseDom = document.querySelector(".sunrise");
const sunsetDom = document.querySelector(".sunset");

window.addEventListener("load", () => {
  let long;
  let lat;
  // Accessing the Current Loaction of the User
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      // console.log(position);
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api}&units=metric`;
      console.log(base);
      fetch(base)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const { temp } = data.main;
          const place = data.name;
          const { description, icon } = data.weather[0];
          const { sunrise, sunset } = data.sys;
          // console.log(temp);
          // console.log(place);
          // console.log(description);
          // console.log(icon);
          // console.log(sunrise);
          // console.log(sunset);

          const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
          const fahrenheit = (temp * 9) / 5 + 32;

          // Converting Epoch(Unix) time to GMT
          const sunriseGMT = new Date(sunrise * 1000);
          const sunsetGMT = new Date(sunset * 1000);

          // Interacting with DOM to show data
          iconImg.src = iconUrl;
          loc.textContent = `${place}`;
          desc.textContent = `${description}`;
          tempC.textContent = `${temp.toFixed(2)} °C`;
          tempF.textContent = `${fahrenheit.toFixed(2)} °F`;
          sunriseDom.textContent = `${sunriseGMT.toLocalDateString()}, ${
            sunriseGMT.toLocaleTimeString
          }`;
          sunsetDom.textContent = `${sunsetGMT.toLocalDateString()}, ${sunsetGMT.toLocaleTimeString()}`;
        });
    });
  }
});
