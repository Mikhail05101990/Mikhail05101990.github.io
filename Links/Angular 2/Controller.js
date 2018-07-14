/* Mikhail Pavlovich , Misha05101990@gmail.com */

var app = angular.module('linksapp', ['ngMaterial']);


app.controller('linker', function($scope)
{
  $scope.title = 'Angular 2 links'

  this.links1 = [{
    description: 'Indeed you should read about Angular 2',
    ref: "https://habr.com/post/309300/"
  }]


});
