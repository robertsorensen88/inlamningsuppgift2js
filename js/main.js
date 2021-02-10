let button = document.querySelector("#btn");
let inputValue = document.querySelector("#inputValue");

let checkboxWeather = document.querySelector("#weather");

let cityName = document.querySelector(".name");
let temp = document.querySelector(".temp");
let desc = document.querySelector(".desc");
let imgicon = document.querySelector(".icon");
let weatherOutput = document.querySelector(".weatherOutput");

button.addEventListener("click", function () {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      inputValue.value +
      "&units=metric&lang=sv&appid=30bf8fd456daf720ce8448f13678dae1"
  )
    .then((response) => response.json())
    .then((data) => {
      let city = data["name"];
      let tempValue = data["main"]["temp"];
      let description = data["weather"][0]["description"];
      let icon = data["weather"][0]["icon"];
      var iconurl = "http://openweathermap.org/img/w/" + icon + ".png";

      if (checkboxWeather.checked === true) {
        cityName.innerHTML = city;
        temp.innerHTML = tempValue + " °C";
        desc.innerHTML = description;
        imgicon.src = iconurl;

        weatherOutput.appendChild(imgicon);
        weatherOutput.appendChild(cityName);
        weatherOutput.appendChild(temp);
        weatherOutput.appendChild(desc);
      } else {
        alert("Press weather checkbox to get weather information.");
        cityName.innerHTML = city;
        weatherOutput.appendChild(cityName);
        weatherOutput.removeChild(temp);
        weatherOutput.removeChild(desc);

      }
    })
    .catch((err) => alert("There is no city like that!"));
});
