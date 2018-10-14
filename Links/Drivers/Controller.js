/* Mikhail Pavlovich , Misha05101990@gmail.com */

var app = angular.module('linksapp', ['ngMaterial']);


app.controller('linker', function($scope)
{
  $scope.title = 'Driver links'

  this.links1 = [{
    description: 'USB pin description',
    ref: "http://rones.su/techno/usb.html"
  }]


    
});
