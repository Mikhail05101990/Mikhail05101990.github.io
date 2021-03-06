/* Mikhail Pavlovich , Misha05101990@gmail.com */

var app = angular.module('linksapp', ['ngMaterial']);


app.controller('linker', function($scope)
{
  $scope.title = 'Extensions links'

  this.links1 = [{
    description: 'A Simple chrome extension',
    ref: "https://tproger.ru/articles/how-to-build-a-chrome-extension/"
  },{
    description: 'JS APIs (FireFox)',
    ref: "https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API"
  },{
      description:"XUL tutorial",
      ref:"https://developer.mozilla.org/en-US/docs/Mozilla/Tech/XUL/Tutorial"
  },{
      description:"Firefox extension (45 an later)",
      ref:"https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension"
  },{
      description:"Firefox extension (second)",
      ref:"https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_second_WebExtension"
  },{
      description:"Firefox extensions. Content scripts",
      ref:"https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Content_scripts"
  },{
      description:"Firefox extensions. contentScripts API",
      ref:"https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/executeScript"
  }]


    
});
