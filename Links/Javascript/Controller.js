/* Mikhail Pavlovich , Misha05101990@gmail.com */

var app = angular.module('linksapp', ['ngMaterial']);


app.controller('linker', function($scope)
{
  $scope.title = 'Javascript links'

  this.links1 = [{
    description: 'Javascript basics',
    ref: "https://www.w3schools.com/js/default.asp"
  },{
    description: 'jquery basics',
    ref: "https://www.w3schools.com/jquery/default.asp"
  },{
      description: "Fetching chunks of data by API",
      ref: "https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest"
  },{
      description: "Console API",
      ref: "https://developers.google.com/web/tools/chrome-devtools/console/console-reference?utm_source=dcc&utm_medium=redirect&utm_campaign=2016q3#consoledirobject"
  },{
      description: "About Cross-origin resource sharing (CORS)",
      ref: "https://developer.mozilla.org/ru/docs/Web/HTTP/CORS"
  },{
      description: "Cross-domain requests With CORS",
      ref: "https://humanwhocodes.com/blog/2010/05/25/cross-domain-ajax-with-cross-origin-resource-sharing/"
  }]


});
