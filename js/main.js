let button = document.querySelector("#btn");
let inputValue = document.querySelector("#inputValue");

let checkboxWeather = document.querySelector("#weather");
let checkboxattr = document.querySelector("#attraction");

let cityNames = document.querySelector(".name");
let temp = document.querySelector(".temp");
let desc = document.querySelector(".desc");
let imgicon = document.querySelector(".icon");
let weatherOutput = document.querySelector(".weatherOutput");

var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0");
var yyyy = String(today.getFullYear());

today = yyyy + mm + dd;

button.addEventListener("click", function () {
  removeAttr();
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
        cityNames.innerHTML = city;
        temp.innerHTML = tempValue + " °C";
        desc.innerHTML = description;
        imgicon.src = iconurl;

        weatherOutput.appendChild(imgicon);
        weatherOutput.appendChild(cityNames);
        weatherOutput.appendChild(temp);
        weatherOutput.appendChild(desc);
      } else {
        alert("Press weather checkbox to get weather information.");
        cityNames.innerHTML = city;
        weatherOutput.appendChild(cityNames);
        weatherOutput.removeChild(imgicon);
        weatherOutput.removeChild(temp);
        weatherOutput.removeChild(desc);
      }
    })
    .catch((err) => console.log("There is no city like that!"));

  // från Foursquare kontot
  const clientId = "USRPOYYJTDVVLZUFMHGNCGFUFLE3DEHF1B3H0DFECZWMVMH3";
  const clientSecret = "XOZUXEYZB3L50KZ2QQOG31A0WZ0LBBRO3WZFNPCRYHVM1G5N";
  const todaysDate = today;
  const cityName = inputValue.value;

  const venueUrl = new URL("https://api.foursquare.com/v2/venues/explore");
  venueUrl.searchParams.append("client_id", clientId);
  venueUrl.searchParams.append("client_secret", clientSecret);
  venueUrl.searchParams.append("near", cityName);
  venueUrl.searchParams.append("v", todaysDate);
  venueUrl.searchParams.append("limit", 10);
  console.log(venueUrl);

  const venueRequest = new XMLHttpRequest();
  venueRequest.open("GET", venueUrl);
  venueRequest.responseType = "json";

  if (checkboxattr.checked === true) {
    venueRequest.onload = function () {
      const venues = venueRequest.response.response.groups[0].items;

      let parent = document.querySelector(".attr");

      for (let i = 0; i < 10; i++) {
        let venuePick = venues[i].venue;

        let div = document.createElement("div");
        let attractions = document.createElement("h4");

        div.id = "attractions";
        attractions.innerHTML = venuePick.name;

        div.appendChild(attractions);
        parent.appendChild(div);
        console.log(`${venuePick.name}`);
      }
    };
    venueRequest.send();
  }
  else{
    alert('Press attraction checkbox to get attractions.')
  }
});

function removeAttr() {
  let topattr = document.querySelectorAll("#attractions");
  for (var i = 0; i < topattr.length; i++) {
    topattr[i].remove();
  }
}
