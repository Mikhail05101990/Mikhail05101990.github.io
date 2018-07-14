/* Mikhail Pavlovich , Misha05101990@gmail.com */

var app = angular.module('linksapp', ['ngMaterial']);


app.controller('linker', function($scope)
{
  $scope.title = 'Angular links'

  this.links1 = [{
    description: 'Basic knowledge',
    ref: "https://material.angularjs.org/HEAD/"
  }]


});
