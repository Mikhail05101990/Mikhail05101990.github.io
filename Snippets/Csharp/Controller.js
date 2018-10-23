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
    $description: 'Examples of entity'
  },
  {
    title: 'js functions - get, post',
    snip: '$(document).ready(function () {' + '\n' +
    '\n' +
    '\t' + '$("#btn1").click(function (event) {' + '\n'  +
    '\t' + '\t' + 'event.preventDefault();' + '\n'  + 
    '\t' + '\t' + 'AddCar();' + '\n'  + 
    '\t' + '});' + '\n'  +
    '\n' +
    '}' + '\n' +
    '\n' +
    'function GetAllCars() {' + '\n' +
    '\n' +
    '\t' + '$.ajax({' + '\n'  +
    '\t' + '\t' + "url: '/api/Cars'," + '\n'  + 
    '\t' + '\t' + "type: 'GET'," + '\n'  + 
    '\t' + '\t' + "dataType: 'json'," + '\n'  + 
    '\t' + '\t' + 'success: function (data) {' + '\n'  + 
    '\t' + '\t' + '\t' + 'WriteResponse(data);' + '\n'  + 
    '\t' + '\t' + '},' + '\n'  + 
    '\t' + '\t' + "error: function (x, y, z) {" + '\n'  + 
    '\t' + '\t' + '\t' + "alert(x + '" + '\\n' + " + y + '" + '\\n' + " + z);" + '\n'  + 
    '\t' + '\t' + '}' + '\n'  + 
    '\t' + '});' + '\n'  + 
    '}' + '\n'  + 
    '\n' +
    'function AddCar() {' + '\n' +
    '\n' +
    '\t' + 'var Car = {' + '\n'  +
    '\t' + '\t' + 'UserId: 1,' + '\n'  + 
    '\t' + '\t' + "Model: $('#addModel').val()," + '\n'  + 
    '\t' + '\t' + "Year: $('#addYear').val()," + '\n'  + 
    '\t' + '\t' + "Price: $('#addPrice').val()," + '\n'  + 
    '\t' + '\t' + "Color: $('#addColor').val()" + '\n'  + 
    '\t' + '};' + '\n'  +
    '\t' + '$.ajax({' + '\n'  + 
    '\t' + '\t' + "url: '/api/Cars/'," + '\n'  +   
    '\t' + '\t' + "type: 'POST'," + '\n'  + 
    '\t' + '\t' + "data: JSON.stringify(Car)," + '\n'  + 
    '\t' + '\t' + 'contentType: "application/json;charset=utf-8",' + '\n'  +
    '\t' + '\t' + 'success: function (data) {' + '\n'  +
    '\t' + '\t' + '\t' + 'GetAllCars();' + '\n'  + 
    '\t' + '\t' + '},' + '\n'  + 
    '\t' + '\t' + 'error: function (x, y, z) {' + '\n'  + 
    '\t' + '\t' + '\t' + "alert(x + '" + '\\n' + " + y + '" + '\\n' + " + z);" + '\n'  + 
    '\t' + '\t' + '}' + '\n'  + 
    '\t' + '});' + '\n'  + 
    '}' + '\n',
    $description: 'Examples of functions'
  },
  {
    title: 'Table render functions',
    snip: 'function WriteResponse(cars) {' + '\n' +
    '\n' +
    '\t' + 'var strResult = "<table><th>Login</th><th>Password</th><th>Model</th><th>Year</th><th>Price</th><th>Color</th>";' + '\n'  +
    '\t' + 'var str = "";' + '\n'  +
    '\t' + '$.each(cars, function (index, Car) {' + '\n'  +
    '\t' + '\t' + '$.each(Car.car, function (index, value) {' + '\n'  + 
    '\t' + '\t' + '\t' + 'str += "<tr><td>" + Car.login + "</td><td>" + Car.password + "</td><td>" + value.model + "</td><td>" + value.year + "</td><td>" + value.price + "</td><td>" + value.color + "</td></tr>";' + '\n'  + 
    '\t' + '\t' + '\t' + 'strResult += str;' + '\n'  + 
    '\t' + '\t' + '\t' + 'str = "";' + '\n'  + 
    '\t' + '\t' + '});' + '\n'  + 
    '\t' + '});' + '\n'  +
    '\t' + 'strResult += "</table>";' + '\n'  +
    '\t' + '$("#tableBlock").html(strResult);' + '\n'  +
    '}',
    $description: 'A table is loaded by the function'
  },{
      title: "Razor page with fields which constructed by Helper",
      snip: '<div class="form-group">' + '\n' + 
                '\t' + '<label class="col-md-2 control-label">Title</label>' + '\n' +
                '\t' + '<div class="col-md-10">' + '\n' +
                    '\t' + '\t' + '@Html.TextBoxFor(m => ev.Title, new { @class = "form-control" })' + '\n' +
                '\t' + '</div>' + '\n' +
            '</div>' + '\n' +
            '<div class="form-group">' + '\n' +
                '\t' + '<label class="col-md-2 control-label">Field name</label>' + '\n' +
                '\t' + '<div class="col-md-10">' + '\n' +
                    '\t' + '\t' + '@Html.TextBoxFor(m => ev.Field, new { @class = "form-control" })' + '\n' +
                '\t' + '</div>' + '\n' +
            '</div>' + '\n' +
            '<div class="form-group">' + '\n' +
                '\t' + '<label class="col-md-2 control-label">Field value</label>' + '\n' +
                '\t' + '<div class="col-md-10">' + '\n' +
                    '\t' + '\t' + '@Html.TextBoxFor(m => ev.FieldValue, new { @class = "form-control" })' + '\n' +
                '\t' + '</div>' + '\n' +
            '</div>' + '\n' +
        '<input type="submit" />"' + '\n',
        description: "Input form with TextBoxFor"
  },{
      title: "Razor page with an array",
      snip: '<div class="form-group">' + '\n' +
            '\t' + '<label class="col-md-2 control-label">Title</label>' + '\n' +
            '\t' + '<div class="col-md-10">' + '\n' +
                '\t' + '\t' + '<input type="text" class="form-control" name="Fields[0].Title" value="" />' + '\n' +
            '\t' + '</div>' + '\n' +
        '</div>' + '\n' +
        '<div class="form-group">' + '\n' +
            '\t' + '<label class="col-md-2 control-label">Field name</label>'  + '\n' +
            '\t' + '<div class="col-md-10">' + '\n' +
                '\t' + '\t' + '<input type="text" class="form-control" name="Fields[0].Field" value="" />' + '\n' +
            '\t' + '</div>' + '\n' +
        '</div>' + '\n' +
        '<div class="form-group">' + '\n' +
            '\t' + '<label class="col-md-2 control-label">Field value</label>' + '\n' +
            '\t' + '<div class="col-md-10">' + '\n' +
                '\t' + '\t' + '<input type="text" class="form-control" name="Fields[0].FieldValue" value="" />' + '\n' +
            '\t' + '</div>' + '\n' +
        '</div>' + '\n' +
        '<div id="lastBlock" class="form-group">' + '\n' +
            '\t' + '<div class="col-md-offset-2 col-md-10">' + '\n' +
                '\t' + '\t' + '<input type="submit" id="send" class="btn btn-default" value="Add event" />' + '\n' +
            '\t' + '</div>' + '\n' +
        '</div>',
      description: "Array of fields for a complicated object"
  }]

});
