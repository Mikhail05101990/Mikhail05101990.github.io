/* Mikhail Pavlovich , Misha05101990@gmail.com */

var app = angular.module('linksapp', ['ngMaterial']);


app.controller('linker', function($scope)
{
  $scope.title = 'Extensions links'

  this.links1 = [{
    description: 'A Simple chrome extension',
    ref: "https://tproger.ru/articles/how-to-build-a-chrome-extension/"
  },{
    description: 'Develop a firefox extension',
    ref: "https://developer.mozilla.org/en-US/docs/Archive/Add-ons/Overlay_Extensions/XUL_School/The_Essentials_of_an_Extension"
  }]


    
});
