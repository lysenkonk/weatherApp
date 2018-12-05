$(document).ready(function(){
    let appId = "122d64769961b0641fad88d5cba170b2";
    navigator.geolocation.getCurrentPosition(success, error);
    
    function success(pos){
      let lat = pos.coords.latitude;
      let long = pos.coords.longitude;
      weather(lat, long);
    }
    function error(){
      console.log('Error, coords undefined!!');
    }
    
    function weather(lat, long){
      let URL = `api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${appId}`;
      $.getJSON(URL, function(data){
        console.log(data);
        updateDOM(data);
      });
    } 
  
    function updateDOM(data){
      let city = data.name;
      let temp = Math.round(data.main.temp);
      let desc = data.weather[0].description;
      let icon =  data.weather[0].icon;
      $('#city').html(city);
      $('#temp').html(temp);
      $('#desc').html(desc);
      $('#icon').attr('src', icon);
      
    }
  });