/* Mikhail Pavlovich , Misha05101990@gmail.com */

var app = angular.module('linksapp', ['ngMaterial']);


app.controller('linker', function($scope)
{
  $scope.title = 'HTML links'

  this.links2 = [{
    description: 'Basic knowledge about tags',
    ref: "http://htmlbook.ru/html"
  }]


});
