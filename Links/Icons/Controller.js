var app = angular.module('linksapp', ['ngMaterial']);

app.controller('linker', function($scope)
{
  $scope.title = 'Icon editors'

  this.links1 = [{
    description: 'Simple editor',
    ref: "https://iconsflow.com/ru/%D1%80%D0%B5%D0%B4%D0%B0%D0%BA%D1%82%D0%BE%D1%80"
  },{
    description: 'Extended editor',
    ref: "http://www.xiconeditor.com/"
  }]


    
});
