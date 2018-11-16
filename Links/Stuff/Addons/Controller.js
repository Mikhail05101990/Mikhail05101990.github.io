/* Mikhail Pavlovich , Misha05101990@gmail.com */

var app = angular.module('linksapp', ['ngMaterial']);


app.controller('linker', function($scope)
{
  $scope.title = 'Addons for Mozilla'

      this.links = [{
        description: "For falsification gathered data",
        short: "https://addons.mozilla.org/ru/firefox/addon/privacy-possum",
        ref: "https://addons.mozilla.org/ru/firefox/addon/privacy-possum/?src=homepage-collection-featured"
        },{
        description: "For confidential searching",
        short: "https://addons.mozilla.org/ru/firefox/addon/duckduckgo",
        ref: "https://addons.mozilla.org/ru/firefox/addon/duckduckgo-for-firefox/?src=homepage-collection-featured"
        },{
        description: "Cookies autodeleting",
        short: "https://addons.mozilla.org/ru/firefox/addon/cookie-autodelete",
        ref: "https://addons.mozilla.org/ru/firefox/addon/cookie-autodelete/?src=homepage-collection-featured"
        },{
        description: "Web faster",
        short: "https://addons.mozilla.org/ru/firefox/addon/disconnect",
        ref: "https://addons.mozilla.org/ru/firefox/addon/disconnect/?src=homepage-collection-featured"
        },{
        description: "Ads block",
        short: "https://addons.mozilla.org/ru/firefox/addon/adblock-plus",
        ref: "https://addons.mozilla.org/ru/firefox/addon/adblock-plus/?src=search"
        },{
        description: "AVAST",
        short: "https://addons.mozilla.org/ru/firefox/addon/avast-online-security",
        ref: "https://addons.mozilla.org/ru/firefox/addon/avast-online-security/?src=search"
        }]

});
