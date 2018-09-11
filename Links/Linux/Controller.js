/* Mikhail Pavlovich , Misha05101990@gmail.com */

var app = angular.module('linksapp', ['ngMaterial']);


app.controller('linker', function($scope)
{
  $scope.title = 'Linux links'

  this.links1 = [{
    description: 'Working with devices in Ubuntu',
    ref: "http://itautsors.ru/ubuntu-montiruem-fleshkucddvdiso"
  }]


});
