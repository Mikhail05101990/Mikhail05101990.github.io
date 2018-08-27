/* Mikhail Pavlovich , Misha05101990@gmail.com */

var app = angular.module('linksapp', ['ngMaterial']);


app.controller('linker', function($scope)
{
  $scope.title = 'C# links'

  this.links1 = [{
    description: 'C# 6.0 draft',
    ref: "https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/language-specification/introduction"
  },
{
  description: 'Asp.net tutorials',
  ref: "https://www.quora.com/Whats-the-best-book-to-learn-Restful-API-creation-in-C-ASP-net"
},
{
  description: 'Asp.net video guidance developed by Microsoft',
  ref: "https://app.pluralsight.com/player?author=jon-flanders&clip=0&course=aspnetwebapi&mode=live&name=aspnetwebapi-m1-introduction"
},{
  description: 'Security with individual accounts',
  ref: "https://docs.microsoft.com/en-us/aspnet/web-api/overview/security/individual-accounts-in-web-api"
},{
  description: 'Asp.net core migrations when the database was changed',
  ref: "https://docs.microsoft.com/en-us/aspnet/core/data/ef-rp/migrations?view=aspnetcore-2.1&tabs=visual-studio"
}]


});
