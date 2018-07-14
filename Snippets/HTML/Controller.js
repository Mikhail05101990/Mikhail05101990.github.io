/* Mikhail Pavlovich , Misha05101990@gmail.com */

var app = angular.module('snippets', ['ngMaterial']);


app.controller('snipcontr', function($scope)
{
  this.snippets1 = [{
    title: 'Frame of HTML page\n',
    snip: '<!DOCTYPE htm>' + '\n' +
    '<html lang="en">' + '\n' +
    '<head>' + '\n' +
    '  <title>HTML snippets</title>' + '\n' +
    '<meta charset="utf-8"/>' + '\n' +
    '</head>' + '\n' +
    '<body>' + '\n' +
    '  <div>' + '\n' +
    '  </div>' + '\n' +
    '</body>' + '\n' +
    '</html>',
    $description: 'The base tags of an empty HTML document.'
  },
  {
    title: 'Angular api links',
    snip: '<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js"></script>'+ '\n' +
    '<link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/angular_material/1.0.0/angular-material.min.css">' + '\n' +
    '<script src="https://ajax.googleapis.com/ajax/libs/angular_material/1.0.0/angular-material.min.js"></script>'+ '\n' +
    '<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular-animate.min.js"></script>'+ '\n' +
    '<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular-aria.min.js"></script>'+ '\n' +
    '<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular-messages.min.js"></script>',
    description: 'Links that ensure basic functionality of Angular API.'
  }]


});
