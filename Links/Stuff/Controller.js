/* Mikhail Pavlovich , Misha05101990@gmail.com */

var app = angular.module('linksapp', ['ngMaterial']);


app.controller('linker', function($scope)
{
  $scope.title = 'Unsorted links'

  this.links1 = [{
    description: 'Filters',
    ref: "http://waterfilters.by/kartridzhi-dlya-statsionarnykh-sistem/komplekt-smennykh-moduley-akvafor-trio-v510-03-02-07/"
  },{
    description: 'Filters 2',
    ref: "https://www.21vek.by/drinking_water_filter/510030207_aquaphor.html"
  },{
      description:"Filters 3",
      ref:"https://atoll.by/filter-water-aquaphor/filtry-aquaphor-nabory-kartridzhi/aquaphor-water-filter-kartridzhi-kartridji-nabory-trio-v510-03-02-07/"
  },{
      description:"Weather",
      ref:"..\\..\\weather\\index.html"
  },{
      description:"Icons",
      ref:"..\\Icons\\index.html"
  }]


    
});
