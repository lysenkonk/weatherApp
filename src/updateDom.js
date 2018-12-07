import $ from 'jquery';
import Forecast from './weather.js';

function fillOutTable(elTemp, elSrc, elDesc, elHumidity, elWind, currForecast)
{
    $(elTemp).html(currForecast.temperature);
    $(elSrc).attr('src', currForecast.icon);
    $(elDesc).html(currForecast.desc);
    $(elHumidity).html(currForecast.humidity);
    $(elWind).html(currForecast.windSpeed);
}

function getDataForDefiniteDate(date, forecastMap, currentTab)
{
    //let buttons = $('.tabset a');
    //let currentTab = $(buttons.filter('.active').attr('href'));
    let arrTemp = $(currentTab).find('.temp');
    let arrSrc = $(currentTab).find('.icon');
    let arrDesc = $(currentTab).find('.desc');
    let arrHumidity = $(currentTab).find('.humidity');
    let arrWind = $(currentTab).find('.wind');
    
    for (let dt of forecastMap.keys()) {
        if (((dt.getDate() == date.getDate()) || ((dt.getHours() == 0) && (dt.getDate() == date.getDate() + 1))) && (dt.getFullYear() == date.getFullYear()) && (dt.getMonth() == date.getMonth())) {
            let currentForecast = forecastMap.get(dt);
            let hours = dt.getHours();
            switch (true) {

                case (hours >= 6 && hours <= 9):
                    fillOutTable(arrTemp[0], arrSrc[0], arrDesc[0], arrHumidity[0], arrWind[0], currentForecast);
                    break;

                case (hours > 12 && hours <= 18):
                    fillOutTable(arrTemp[1], arrSrc[1], arrDesc[1], arrHumidity[1], arrWind[1], currentForecast);
                    break;

                case (hours > 18 && hours <= 21):
                    fillOutTable(arrTemp[2], arrSrc[2], arrDesc[2], arrHumidity[2], arrWind[2], currentForecast);
                    break;

                case (hours > 21 || hours <= 6):
                    fillOutTable(arrTemp[3], arrSrc[3], arrDesc[3], arrHumidity[3], arrWind[3], currentForecast);
                    break;
            }
        }
    }
}
function updateDOM(data, currentTab) {

    let forecast = new Forecast(new Date(), data.list);
    let date = new Date();

    getDataForDefiniteDate(date, forecast.weathers, currentTab);
}
export { updateDOM };
