/* Mikhail Pavlovich , Misha05101990@gmail.com */

var app = angular.module('snippets', ['ngMaterial']);


app.controller('snipcontr', function($scope)
{
  this.snippets1 = [{
    title: 'Examples of Entity',
    snip: 'public class User' + '\n' +
    '{' + '\n' +
    '\t' + '[Key]' + '\n' +
    '\t' + 'public int UserId { get; set; }' + '\n' +
    '\t' + '\n' +
    '\t' + '[Required(ErrorMessage = "Required Username")]' + '\n' +
    '\t' + '[StringLength(30, MinimumLength = 6, ErrorMessage = "Login must be Minimum 6 Charaters")]' + '\n' +
    '\t' + 'public string Login { get; set; }' + '\n' +
    '\t' + '\n' +
    '\t' + '[DataType(DataType.Password)]' + '\n' +
    '\t' +  '[Required(ErrorMessage = "Required Password")]' + '\n' +
    '\t' +  '[MaxLength(30, ErrorMessage = "Password cannot be Greater than 30 Charaters")]' + '\n' +
    '\t' +  '[StringLength(31, MinimumLength = 6, ErrorMessage = "Password must be Minimum 6 Charaters")]' + '\n' +
    '\t' +  'public string Password { get; set; }' + '\n' +
    '\t' +  '' + '\n' +
    '\t' +  'public virtual List<Car> Car { get; set; }' + '\n' +
    '}' + '\n' +
    '\n' +
    'public class Car' + '\n' +
    '{' + '\n' +
    '\t' +  '[Key]' + '\n' +
    '\t' +  'public int CarId { get; set; }' + '\n' +
    '\t' +  'public string Model { get; set; }' + '\n' +
    '\t' +  'public int Year { get; set; }' + '\n' +
    '\t' +  'public double Price { get; set; }' + '\n' +
    '\t' +  'public string Color { get; set; }' + '\n' +
    '\n' +
    '\t' + 'public int UserId { get; set; }' + '\n' +
    '\t' + 'public User User { get; set; }' + '\n' +
    '}' + '\n',
    $description: 'Users and cars'
  }]


});
