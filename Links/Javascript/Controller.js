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
  }]


});
