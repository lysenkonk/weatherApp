import $ from "jquery";

$(function(){
  let appId = "122d64769961b0641fad88d5cba170b2";
  let srcForIcons = "https://openweathermap.org/img/w/";
  navigator.geolocation.getCurrentPosition(success, error);
  
    function success(pos){
      let lat = pos.coords.latitude;
      let long = pos.coords.longitude;
      console.log(lat, long);
      weather(lat, long);
    }
    function error(){
      console.log('error');
    }
    
    function weather(lat, long){
     let URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${appId}&units=metric`;
     if(URL)
     {
      console.log(URL);
     }
      $.getJSON(URL, function(data){
        console.log(data);
        let list = data;
        console.log(list);
        updateDOM(data);
      });
    } 
  
    function updateDOM(data){
      let city = data.name;
      let temp = Math.round(data.main.temp);
      let humidity = `${data.main.humidity} %`;
      let desc = data.weather[0].description;
      let wind = `${data.wind.speed} m/s`;
      let src =  srcForIcons + data.weather[0].icon + '.png';
      $(".header h2").html(city);
      $('#temp').html(temp);
      $('#desc').html(desc);
      $('.icon').attr('src', src);
      $('#wind').html(wind);
      $('#humidity').html(humidity);
      
    }
});
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';