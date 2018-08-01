/* Mikhail Pavlovich , Misha05101990@gmail.com */

var app = angular.module('linksapp', ['ngMaterial']);


app.controller('linker', function($scope)
{
  $scope.title = 'Weather sites'

  this.links1 = [
    {
      description: 'The weather in Minsk',
      links: [{
        short: "http://rp5.by",
        ref: "http://rp5.by/%D0%9F%D0%BE%D0%B3%D0%BE%D0%B4%D0%B0_%D0%B2_%D0%9C%D0%B8%D0%BD%D1%81%D0%BA%D0%B5,_%D0%91%D0%B5%D0%BB%D0%B0%D1%80%D1%83%D1%81%D1%8C"
        },
        {
          short: "https://meteonovosti.by",
          ref: "https://meteonovosti.by/7days/"
        },
        {
          short: "http://www.meteoprog.by",
          ref: "http://www.meteoprog.by/ru/weather/Minsk/"
        },
        {
          short: "http://meteoinfo.by",
          ref: "http://meteoinfo.by/6/?city=26850"
        },
        {
          short: "http://minsk.the.by",
          ref: "http://minsk.the.by/"
        },
        {
          short: "https://yandex.byhttp://minsk.the.by/",
          ref: "https://yandex.by/pogoda/minsk"
        },
        {
          short: "https://www.accuweather.com",
          ref: "https://www.accuweather.com/ru/by/minsk/28580/daily-weather-forecast/28580"
        },
        {
          short: "http://pogoda.by",
          ref: "http://6.pogoda.by/"
        },
        {
          short: "https://www.gismeteo.by",
          ref: "https://www.gismeteo.by/weather-minsk-4248/3-days/"
        }]
    },
    {
      description: 'The weather in Dankovichi',
      links: [{
          short: "https://www.gismeteo.by",
          ref: "https://www.gismeteo.by/weather-dankovichi-125846/3-days/"
        },
        {
          short: "https://www.meteoprog.ua",
          ref: "https://www.meteoprog.ua/ru/weather/Dankovichi/"
        },
        {
          short: "https://www.gismeteo.md",
          ref: "https://www.gismeteo.md/city/daily/125846/"
        },
        {
          short: "https://rp5.ru",
          ref: "https://rp5.ru/%D0%9F%D0%BE%D0%B3%D0%BE%D0%B4%D0%B0_%D0%B2_%D0%94%D0%B0%D0%BD%D1%8C%D0%BA%D0%BE%D0%B2%D0%B8%D1%87%D0%B0%D1%85"
        },
        {
          short: "https://www.alphaweather.net",
          ref: "https://www.alphaweather.net/%D0%9F%D1%80%D0%BE%D0%B3%D0%BD%D0%BE%D0%B7_%D0%BF%D0%BE%D0%B3%D0%BE%D0%B4%D1%8B_%D0%B2_%D0%94%D0%B0%D0%BD%D1%8C%D0%BA%D0%BE%D0%B2%D0%B8%D1%87%D0%B0%D1%85"
        },
        {
          short: "http://www.meteoprog.uz",
          ref: "http://www.meteoprog.uz/ru/weather/Dankovichi/7days/"
        }]
  }]


});
