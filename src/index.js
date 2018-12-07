import $ from 'jquery';

import {updateDOM} from './updateDom.js';

$(function () {
  let locationImg = $('#location');
  let idApiDataLocation = 'd2523868d4c54979d6e1f620d7103b007ef13d7ffeddd33ba1b6e868';
  let idOpenWeather = "122d64769961b0641fad88d5cba170b2";
  let urlApiWeatherFor5Days = `https://api.openweathermap.org/data/2.5/forecast?q=`;
  let optionsReqApiWeather = `,ua&units=metric&appid=${idOpenWeather}`;
 
  locationImg.on('click', function(){ getLocation()});

  function getNameCity() {
    return new Promise(function (resolve, reject) {
      $.get(`https://api.ipdata.co?api-key=${idApiDataLocation}`, function (response) {
        return resolve(response);
      }, "jsonp");
    });
  }

  function getLocation()
  {
    getNameCity()
    .then(function (response) {
      $(".header h2").html(response.city);
      $('.header h3').html(response.country_name);
      return (response.city);
    })
    .then(function (city) {
      $.getJSON(`${urlApiWeatherFor5Days}${city}${optionsReqApiWeather}`, function (data) {
        console.log(data.list); 
        updateDOM(data, city);
      });
    })
  }

  
});
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';