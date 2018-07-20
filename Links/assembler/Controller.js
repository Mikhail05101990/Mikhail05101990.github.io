/* Mikhail Pavlovich , Misha05101990@gmail.com */

var app = angular.module('linksapp', ['ngMaterial']);


app.controller('linker', function($scope)
{
  $scope.title = 'Assembler links'

  this.links1 = [{
    description: 'About how to write programs in assemler in 2018',
    ref: "https://habr.com/post/345748/"
  },
  {
    description: 'About the structure of exe files',
    ref: "http://cs.usu.edu.ru/docs/pe/"
  }]


});
