/* Mikhail Pavlovich , Misha05101990@gmail.com */

var app = angular.module('linksapp', ['ngMaterial']);


app.controller('linker', function($scope)
{
  $scope.title = 'Extensions links'

  this.links1 = [{
    description: 'A Simple chrome extension',
    ref: "https://tproger.ru/articles/how-to-build-a-chrome-extension/"
  }]


    
});
