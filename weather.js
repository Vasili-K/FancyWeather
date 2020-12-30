const searchButton = document.querySelector("#reserchPress");
const searchInput = document.querySelector("#researchInput");
const reloadButton = document.querySelector("#reload");

window.addEventListener("load", () => {
  //Massives and variables for translation and transformation
  const dayEng = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayEnglish = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayRus = ["Вск", "Пнд", "Втр", "Сре", "Чтв", "Птн", "Суб"];
  const dayRussian = [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ];
  const descriptionEng = ["Feels Like: ", "Humidity: ", "Wind speed: "];
  const descriptionRu = ["Ощущается как: ", "Влажность: ", "Скорость ветра: "];
  const coordinatesEng = ["Latitude: ", "Longitude: "];
  const coordinatesRu = ["Широта: ", "Долгота: "];
  const countriesEng = {
    BY: "Belarus",
    RU: "Russia",
    US: "USA",
  };
  const countriesRU = {
    BY: "Беларусь",
    RU: "Россия",
    US: "США",
  };

  const сelsius = "°C";
  const fahrenheit = "°F";

  //Work with DOM elements
  const applicationContainer = document.querySelector(".applicationContainer");
  const temperatureDegree = document.querySelector(".temperatureDegree");
  const description = document.querySelector(".description");
  const temperatureFeelsLike = document.querySelector(".temperatureFeels");
  const humidityLevel = document.querySelector(".humidity");
  const windSpeed = document.querySelector(".windSpeed");
  const locationTimezone = document.querySelector(".locationTimezone");
  const currentDate = document.querySelector(".currentDate");
  const time = document.getElementById("time");
  const weatherIcon = document.querySelector(".location p");

  const dayOne = document.querySelector(".dayOne");
  const dayTwo = document.querySelector(".dayTwo");
  const dayThree = document.querySelector(".dayThree");

  const dayOneIcon = document.querySelector(".dayOneIcon");
  const dayTwoIcon = document.querySelector(".dayTwoIcon");
  const dayThreeIcon = document.querySelector(".dayThreeIcon");

  const dayOneDegree = document.querySelector(".dayOneDegree");
  const dayTwoDegree = document.querySelector(".dayTwoDegree");
  const dayThreeDegree = document.querySelector(".dayThreeDegree");

  const mapLat = document.querySelector(".mapLat");
  const mapLong = document.querySelector(".mapLong");

  const degreeChange = document.querySelector(".degreeChange");
  const degreeButton = document.querySelector(".degreeChange button");

  const languageChange = document.querySelector(".languages");
  const languageButton = document.querySelector(".languages button");

  //Additional variables
  let apiToday;
  let showAmPm = true;
  let tudayDate = new Date();
  let zoneOfTime;

  //Chek navigator and fill in DOM elements with text
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((positon) => {
      long = positon.coords.longitude;
      lat = positon.coords.latitude;

      (function getAPI() {
        if (localStorage.getItem("cityName") === null) {
          apiToday = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${long}&days=4&key=a98daf172d3141c987b06544bf30589d`;
        } else {
          let newCityName = localStorage.getItem("cityName");
          apiToday = `https://api.weatherbit.io/v2.0/forecast/daily?&city=${newCityName}&days=4&key=a98daf172d3141c987b06544bf30589d`;
        }
      })();

      fetch(apiToday)
        .then((response) => {
          return response.json();
        })
        .then((dataForToday) => {
          console.log(dataForToday);
          long = dataForToday.lon;
          lat = dataForToday.lat;
          zoneOfTime = dataForToday.timezone;
          console.log(zoneOfTime);
          //Set DOM elements from the API for main screen
          const { temp, app_max_temp, rh } = dataForToday.data[0];
          let iconID = dataForToday.data[0].weather.icon;
          let plaseName = dataForToday.city_name;

          weatherIcon.innerHTML = `<img src = 'https://www.weatherbit.io/static/img/icons/${iconID}.png'></img>`;
          currentDate.textContent =
            dayEng[tudayDate.getDay()] +
            " " +
            tudayDate.getDate() +
            "/" +
            tudayDate.getMonth() +
            "/" +
            tudayDate.getFullYear();
          temperatureDegree.textContent = temp + сelsius;
          description.textContent = dataForToday.data[0].weather.description;
          temperatureFeelsLike.textContent =
            descriptionEng[0] + app_max_temp + " " + сelsius;
          humidityLevel.textContent = descriptionEng[1] + rh + " %";
          windSpeed.textContent =
            descriptionEng[2] +
            Math.round(dataForToday.data[0].wind_spd) +
            " m/s";
          locationTimezone.textContent =
            dataForToday.city_name +
            "  /  " +
            countriesEng[dataForToday.country_code];

          //Set DOM elements from the API for forecast

          let forecastDayOneDate = new Date(
            Date.parse(dataForToday.data[1].valid_date)
          );
          let forecastDayTwoDate = new Date(
            Date.parse(dataForToday.data[2].valid_date)
          );
          let forecastDayThreeDate = new Date(
            Date.parse(dataForToday.data[3].valid_date)
          );

          let iconIDOne = dataForToday.data[1].weather.icon;
          let iconIDTwo = dataForToday.data[2].weather.icon;
          let iconIDThree = dataForToday.data[3].weather.icon;

          dayOneIcon.innerHTML = `<img src = 'https://www.weatherbit.io/static/img/icons/${iconIDOne}.png'></img>`;
          dayTwoIcon.innerHTML = `<img src = 'https://www.weatherbit.io/static/img/icons/${iconIDTwo}.png'></img>`;
          dayThreeIcon.innerHTML = `<img src = 'https://www.weatherbit.io/static/img/icons/${iconIDThree}.png'></img>`;

          dayOneDegree.textContent = dataForToday.data[1].temp + сelsius;
          dayTwoDegree.textContent = dataForToday.data[2].temp + сelsius;
          dayThreeDegree.textContent = dataForToday.data[3].temp + сelsius;

          dayOne.textContent =
            dayEnglish[forecastDayOneDate.getDay()] +
            " " +
            forecastDayOneDate.getDate();
          dayTwo.textContent =
            dayEnglish[forecastDayTwoDate.getDay()] +
            " " +
            forecastDayTwoDate.getDate();
          dayThree.textContent =
            dayEnglish[forecastDayThreeDate.getDay()] +
            " " +
            forecastDayThreeDate.getDate();

          //Latitude and longitude values under the map
          let latitudeValue = (+dataForToday.lat)
            .toFixed(2)
            .toString()
            .replace(".", "°");
          let LongitudeValue = (+dataForToday.lon)
            .toFixed(2)
            .toString()
            .replace(".", "°");
          mapLat.textContent = coordinatesEng[0] + latitudeValue + '"';
          mapLong.textContent = coordinatesEng[1] + LongitudeValue + '"';

          //Change degree from celsius to fahrenheit
          degreeChange.addEventListener("click", () => {
            if (degreeButton.textContent === "°C") {
              changeDegreeF();
            } else {
              degreeButton.textContent = сelsius;
              temperatureDegree.textContent = temp + сelsius;
              localStorage.setItem("Degree", сelsius);
              temperatureFeelsLike.textContent =
                "Feels Like: " + app_max_temp + " " + сelsius;
              dayOneDegree.textContent = dataForToday.data[1].temp + сelsius;
              dayTwoDegree.textContent = dataForToday.data[2].temp + сelsius;
              dayThreeDegree.textContent = dataForToday.data[3].temp + сelsius;
            }
          });

          if (localStorage.getItem("Language") === "RU") {
            changeLangugeRU(apiToday);
          }
          if (localStorage.getItem("Degree") === "°F") {
            changeDegreeF();
          }
          //Change languages
          languageChange.addEventListener("click", () => {
            if (languageButton.textContent === "EN") {
              changeLangugeRU(apiToday);
            } else {
              const apiTodayEN = `${apiToday}&lang=en`;

              fetch(apiTodayEN)
                .then((response) => {
                  return response.json();
                })
                .then((dataForToday) => {
                  description.textContent =
                    dataForToday.data[0].weather.description;
                  temperatureFeelsLike.textContent =
                    descriptionEng[0] + app_max_temp + " " + сelsius;
                  humidityLevel.textContent = descriptionEng[1] + rh + " %";
                  windSpeed.textContent =
                    descriptionEng[2] +
                    Math.round(dataForToday.data[0].wind_spd) +
                    " m/s";

                  locationTimezone.textContent =
                    dataForToday.city_name +
                    "  /  " +
                    countriesEng[dataForToday.country_code];
                  languageButton.textContent = "EN";
                  localStorage.setItem("Language", "EN");
                  currentDate.textContent =
                    dayEng[tudayDate.getDay()] +
                    " " +
                    tudayDate.getDate() +
                    "/" +
                    tudayDate.getMonth() +
                    "/" +
                    tudayDate.getFullYear();
                  dayOne.textContent =
                    dayEnglish[forecastDayOneDate.getDay()] +
                    " " +
                    forecastDayOneDate.getDate();
                  dayTwo.textContent =
                    dayEnglish[forecastDayTwoDate.getDay()] +
                    " " +
                    forecastDayTwoDate.getDate();
                  dayThree.textContent =
                    dayEnglish[forecastDayThreeDate.getDay()] +
                    " " +
                    forecastDayThreeDate.getDate();

                  mapLat.textContent = coordinatesEng[0] + latitudeValue + '"';
                  mapLong.textContent =
                    coordinatesEng[1] + LongitudeValue + '"';
                });
            }
          });
          //Function for time with changing seconds
          function showTime() {
            let today = new Date(
              Date.parse(
                new Date().toLocaleString("en-US", {
                  timeZone: `${zoneOfTime}`,
                })
              )
            );
            let hour = today.getHours(),
              min = today.getMinutes(),
              sec = today.getSeconds();

            let amPm = hour >= 12 ? "PM" : "AM";

            hour = hour % 12 || 12;

            time.innerHTML = `${hour}<span>:</span>${addZero(
              min
            )}<span>:</span>${addZero(sec)} 
                       ${showAmPm ? amPm : ""}`;

            setTimeout(showTime, 1000);
          }
          showTime();
        })
        //Map  initiation
        .then((init) => {
          var map = new ymaps.Map("map", {
            center: [lat, long],
            zoom: 10,
          });
          console.log(lat);
        })
      .catch((error) => {
        alert("Enter right city name");
      });
    });
  }

  function addZero(n) {
    return (parseInt(n, 10) < 10 ? "0" : "") + n;
  }
  //Initiation of background IMG
  const apiBackground = `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=nature&client_id=6DmZz_M0_HQjSSF9etd3HmwjHYkh5bZDfEboVjq_Ku0`;
  fetch(apiBackground)
    .then((responseBackground) => {
      return responseBackground.json();
    })
    .then((dataBackground) => {
      console.log(dataBackground);

      let backImg = `url(${dataBackground.urls.regular})`;
      applicationContainer.style.backgroundImage = backImg;
    });

  //Function for save customer settings for languages
  function changeLangugeRU(apiToday) {
    const apiTodayRU = `${apiToday}&lang=ru`;

    fetch(apiTodayRU)
      .then((response) => {
        return response.json();
      })
      .then((dataForToday) => {
        const { app_max_temp, rh } = dataForToday.data[0];
        let plaseName = dataForToday.city_name;
        let forecastDayOneDate = new Date(
          Date.parse(dataForToday.data[1].valid_date)
        );
        let forecastDayTwoDate = new Date(
          Date.parse(dataForToday.data[2].valid_date)
        );
        let forecastDayThreeDate = new Date(
          Date.parse(dataForToday.data[3].valid_date)
        );
        let latitudeValue = (+dataForToday.lat)
          .toFixed(2)
          .toString()
          .replace(".", "°");
        let LongitudeValue = (+dataForToday.lon)
          .toFixed(2)
          .toString()
          .replace(".", "°");
        mapLat.textContent = coordinatesEng[0] + latitudeValue + '"';
        mapLong.textContent = coordinatesEng[1] + LongitudeValue + '"';

        description.textContent = dataForToday.data[0].weather.description;
        temperatureFeelsLike.textContent =
          descriptionRu[0] + app_max_temp + " " + сelsius;
        humidityLevel.textContent = descriptionRu[1] + rh + " %";
        windSpeed.textContent =
          descriptionRu[2] + Math.round(dataForToday.data[0].wind_spd) + " м/с";

        locationTimezone.textContent =
          dataForToday.city_name +
          "  /  " +
          countriesRU[dataForToday.country_code];
        languageButton.textContent = "RU";
        localStorage.setItem("Language", "RU");
        currentDate.textContent =
          dayRus[tudayDate.getDay()] +
          " " +
          tudayDate.getDate() +
          "/" +
          tudayDate.getMonth() +
          "/" +
          tudayDate.getFullYear();
        dayOne.textContent =
          dayRussian[forecastDayOneDate.getDay()] +
          " " +
          forecastDayOneDate.getDate();
        dayTwo.textContent =
          dayRussian[forecastDayTwoDate.getDay()] +
          " " +
          forecastDayTwoDate.getDate();
        dayThree.textContent =
          dayRussian[forecastDayThreeDate.getDay()] +
          " " +
          forecastDayThreeDate.getDate();

        mapLat.textContent = coordinatesRu[0] + latitudeValue + '"';
        mapLong.textContent = coordinatesRu[1] + LongitudeValue + '"';
      });
  }

  //Function for save customer settings for degree
  function changeDegreeF() {
    const apiTodayF = `${apiToday}`;

    fetch(apiTodayF)
      .then((response) => {
        return response.json();
      })
      .then((dataForToday) => {
        const { temp, app_max_temp, rh } = dataForToday.data[0];

        degreeButton.textContent = fahrenheit;
        localStorage.setItem("Degree", fahrenheit);
        temperatureDegree.textContent =
          Math.round(temp * 1.8 + 32) + fahrenheit;
        temperatureFeelsLike.textContent =
          "Feels Like: " +
          Math.round(app_max_temp * 1.8 + 32) +
          " " +
          fahrenheit;
        dayOneDegree.textContent =
          Math.round(dataForToday.data[1].temp * 1.8 + 32) + fahrenheit;
        dayTwoDegree.textContent =
          Math.round(dataForToday.data[2].temp * 1.8 + 32) + fahrenheit;
        dayThreeDegree.textContent =
          Math.round(dataForToday.data[3].temp * 1.8 + 32) + fahrenheit;
      });
  }
});

//Event Listeners
searchButton.addEventListener("click", () => {
  localStorage.setItem("cityName", searchInput.value);
  document.location.reload();
});

reloadButton.addEventListener("click", () => {
  localStorage.removeItem("cityName");
  localStorage.removeItem("Language");
  localStorage.removeItem("Degree");
  document.location.reload();
});

searchInput.addEventListener("keypress", (e) => {
  if (e.type === "keypress") {
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem("cityName", searchInput.value);
      document.location.reload();
    }
  }
});
