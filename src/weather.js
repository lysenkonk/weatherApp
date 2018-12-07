
class Weather {
    constructor(temperature, icon, desc, windSpeed, humidity) {
        let srcForIcons = "https://openweathermap.org/img/w/";
        this.temperature = Math.round(temperature);
        this.icon = srcForIcons + icon + '.png';;
        this.desc = desc;
        this.windSpeed = Math.round(windSpeed);
        this.humidity = humidity;
    }
}
/*  class WeatherDetailed extends Weather{
     constructor(temperature, icon, desc, windSpeed, humidity, clouds, ){
        super(temperature, icon, desc, windSpeed, humidity, clouds)
     }
 } */
class Forecast {
    constructor(date, data) {
       // this.city = city;
        this.date = date;
        this.data = data;
        this.weathers = data;
    }
    set weathers(value) {
        var listWeather = new Map();
        value.forEach(function (elem) {
            //if(elem.hasOwnProperty(''))
            listWeather.set(
                new Date(elem.dt_txt),
                new Weather(elem.main.temp, elem.weather[0].icon, elem.weather[0].description,
                    elem.wind.speed, elem.main.humidity)
            );
        });
        this._weather = listWeather;
    }
    get weathers() {
        return this._weather;
    }
}

export default Forecast;
