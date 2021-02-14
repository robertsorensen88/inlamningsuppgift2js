let button = document.querySelector("#btn");
let inputValue = document.querySelector("#inputValue");

let checkboxWeather = document.querySelector("#weather");
let checkboxattr = document.querySelector("#attraction");
let checkboxSort = document.querySelector("#sort");

let maincontent = document.querySelector(".content");

var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0");
var yyyy = String(today.getFullYear());

today = yyyy + mm + dd;

button.addEventListener("click", function () {
  removeElement();
  if (checkboxWeather.checked === false && checkboxattr.checked === false) {
    let Nothing2show = document.createElement("h3");
    Nothing2show.innerHTML =
      "No information to display. Please, select an option...";
    Nothing2show.id = "noId";
    maincontent.appendChild(Nothing2show);
  }
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
        let weatherHeader = document.createElement("h1");
        let cityNames = document.createElement("h2");
        let temp = document.createElement("p");
        let desc = document.createElement("p");
        let imgicon = document.createElement("img");
        let weatherOutput = document.createElement("div");

        weatherHeader.id = "hId";
        weatherHeader.innerHTML = "Weather";
        weatherOutput.id = "weatherOutput";
        cityName.id = "wId";
        cityNames.innerHTML = city;
        temp.id = "tId";
        temp.innerHTML = tempValue + " °C";
        desc.id = "dId";
        desc.innerHTML = description;
        imgicon.id = "iID";
        imgicon.src = iconurl;

        maincontent.appendChild(weatherHeader);
        weatherOutput.appendChild(imgicon);
        weatherOutput.appendChild(cityNames);
        weatherOutput.appendChild(temp);
        weatherOutput.appendChild(desc);
        maincontent.appendChild(weatherOutput);
      } else {
        alert("Press weather checkbox to get weather information.");
        let wHeader = document.querySelector("#whId");
        let wContent = document.querySelector("#weatherOutput");

        maincontent.removeChild(wHeader);
        maincontent.removeChild(wContent);
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

      let attrOutput = document.createElement("div");
      attrOutput.className = "attr";
      let attrHeader = document.createElement("h1");
      attrHeader.id = "hId";
      attrHeader.innerHTML = "Attractions";
      let sortVenue = [];
      for (let i = 0; i < 10; i++) {
        sortVenue[i] = {
          Namn: venues[i].venue.name,
          Icon: venues[i].venue.categories[0].icon.prefix + "bg_32.png",
          Address: venues[i].venue.location,
        };
        console.log(sortVenue[i]);
      }
      if (checkboxSort.checked === true) {
        sortVenue.sort(function (a, b) {
          var x = a.Namn.toLowerCase();
          var y = b.Namn.toLowerCase();
          if (x < y) {
            return -1;
          }
          if (x > y) {
            return 1;
          }
          return 0;
        });
        console.log(sortVenue);

        for (let i = 0; i < 10; i++) {
          let venuePick = sortVenue[i].Namn;
          let venueIcon = sortVenue[i].Icon;
          let venueAddress = sortVenue[i].Address;

          let img = document.createElement("img");
          let div = document.createElement("div");
          let attractions = document.createElement("h4");
          let address = document.createElement("p");

          img.src = venueIcon;
          div.id = "attractions";
          address.innerHTML = "<br>Address: <br>" + venueAddress.address;
          attractions.innerHTML = sortVenue[i].Namn;

          maincontent.appendChild(attrHeader);
          div.appendChild(img);
          div.appendChild(attractions);
          div.appendChild(address);
          attrOutput.appendChild(div);
          maincontent.appendChild(attrOutput);
          console.log(`${venuePick.name}`);
        }
      } else {
        for (let i = 0; i < 10; i++) {
          let venuePick = venues[i].venue;
          let venueIcon =
            venues[i].venue.categories[0].icon.prefix + "bg_32.png";
          let venueAddress = venues[i].venue.location;

          let img = document.createElement("img");
          let div = document.createElement("div");
          let attractions = document.createElement("h4");
          let address = document.createElement("p");

          img.src = venueIcon;
          div.id = "attractions";
          address.innerHTML = "<br>Address: <br>" + venueAddress.address;
          attractions.innerHTML = venuePick.name;

          maincontent.appendChild(attrHeader);
          div.appendChild(img);
          div.appendChild(attractions);
          div.appendChild(address);
          attrOutput.appendChild(div);
          maincontent.appendChild(attrOutput);
          console.log(`${venuePick.name}`);
        }
      }
    };
    venueRequest.send();
  } else {
    alert("Press attraction checkbox to get attractions.");
    let removeAttrHeader = document.querySelector("#hId");
    let removeAttrOutput = document.querySelector(".attr");
    maincontent.removeChild(removeAttrOutput);
    maincontent.removeChild(removeAttrHeader);
  }
});

checkboxSort.addEventListener("click", function () {
  if (checkboxSort.checked === true) {
    checkboxattr.checked = true;
  }
});

function removeElement() {
  let removeWeather = document.querySelectorAll("#weatherOutput");
  let removeHeader = document.querySelectorAll("#hId");
  let topattr = document.querySelectorAll("#attractions");
  let removeAttrDiv = document.querySelectorAll(".attr");
  let removeNoOptions = document.querySelectorAll("#noId");

  for (var i = 0; i < topattr.length; i++) {
    topattr[i].remove();
  }
  for (var x = 0; x < removeWeather.length; x++) {
    removeWeather[x].remove();
  }
  for (var y = 0; y < removeHeader.length; y++) {
    removeHeader[y].remove();
  }
  for (var y = 0; y < removeAttrDiv.length; y++) {
    removeAttrDiv[y].remove();
  }
  for (var y = 0; y < removeNoOptions.length; y++) {
    removeNoOptions[y].remove();
  }
}
