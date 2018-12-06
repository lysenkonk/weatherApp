import $ from 'jquery';
import Forecast from './weather.js';

$(function () {
  let idApiDataLocation = 'd2523868d4c54979d6e1f620d7103b007ef13d7ffeddd33ba1b6e868';
  let idOpenWeather = "122d64769961b0641fad88d5cba170b2";
  let urlApiWeatherFor5Days = `https://api.openweathermap.org/data/2.5/forecast?q=`;
  let optionsReqApiWeather = `,ua&units=metric&appid=${idOpenWeather}`;
  var forecast;


  function getNameCity() {
    return new Promise(function (resolve, reject) {
      $.get(`https://api.ipdata.co?api-key=${idApiDataLocation}`, function (response) {
        return resolve(response.city);
      }, "jsonp");
    });
  }

  getNameCity()
    .then(function (city) {
      $(".header h2").html(city);
      return (city);
    })
    .then(function (city) {
      $.getJSON(`${urlApiWeatherFor5Days}${city}${optionsReqApiWeather}`, function (data) {

        console.log(data.list);
        forecast = new Forecast(city, new Date(), data.list);
        updateDOM(data);
      });
    })

  function updateDOM(data) {
    let buttons = $('.tabset a');
    let currentTab = $(buttons.filter('.active').attr('href'));
    let elementsTemp = $(currentTab).find('.temp');
    let arrSrc = $(currentTab).find('.icon');
    let arrDesc = $(currentTab).find('.desc');
    let arrHumidity = $(currentTab).find('.humidity');

    let forecastMap = forecast.weathers;
    let dtNow = new Date();
    let keys = [];
    for (let dt of forecastMap.keys()) {
      if (((dt.getDate() == dtNow.getDate()) || ((dt.getHours() == 0) && (dt.getDate() == dtNow.getDate() + 1 ))) && (dt.getFullYear() == dtNow.getFullYear()) && (dt.getMonth() == dtNow.getMonth())) {
        keys.push(dt);
        let currentWeather = forecastMap.get(dt);
        let hours = dt.getHours();
        switch (true) {
          case (hours >= 6 && hours <= 9):
            $(elementsTemp[0]).html(currentWeather.temperature);
            $(arrSrc[0]).attr('src', currentWeather.icon);
            $(arrDesc[0]).html(currentWeather.desc);
            $(arrHumidity[0]).html(currentWeather.humidity);

            break;
          case (hours > 12 && hours <= 18):
          $(elementsTemp[1]).html(currentWeather.temperature);
          $(arrSrc[1]).attr('src', currentWeather.icon);
          $(arrDesc[1]).html(currentWeather.desc);
          $(arrHumidity[1]).html(currentWeather.humidity);

            break;
          case (hours > 18 && hours <= 21):
          $(elementsTemp[2]).html(currentWeather.temperature);
          $(arrSrc[2]).attr('src', currentWeather.icon);
          $(arrDesc[2]).html(currentWeather.desc);
          $(arrHumidity[2]).html(currentWeather.humidity);
            break;
          case (hours > 21 || hours <= 6):
          $(elementsTemp[3]).html(currentWeather.temperature);
          $(arrSrc[3]).attr('src', currentWeather.icon);
          $(arrDesc[3]).html(currentWeather.desc);
          $(arrHumidity[3]).html(currentWeather.humidity);

            break;
        }
      }
    }
  }
});
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';