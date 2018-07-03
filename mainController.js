/* Mikhail Pavlovich , Misha05101990@gmail.com */

var app = angular
.module('appListToDo', ['ngMaterial']);
app.config(function () {
  angular.element(document).bind('keyup', function (e) {

		if (e.keyCode == 192)
		{
			alert(e.keyCode);
		}

  });
})

app.directive('consolVisibil', ['$document', function($document) {
    return {
      link: function(scope, element, attr) {
        var startX = 0, startY = 0, x = 0, y = 0;

        element.css({
         visibility: 'visible'
        });

        element.on('keyup', function(event) {
          // Prevent default dragging of selected content
          if (event.keyCode == 192)
      		{
      			$document.on('keyup', consolVisibility);
      		}

        });

        function consolVisibility(event) {
          element.css({
            visibility: 'hidden'
          });
          $scope.parConsol= false;
        }


      }
    };
  }]);

app.controller('ctrListToDO', function($scope)
{
	this.my_Csharp_projects = [
	{
	name: 'Bus ticket shop',
	ref: "Csharp\\BusTicketShop\\index.html"
	},
	{
	name: 'Student list',
	ref: "Csharp\\Students\\index.html"
	},
	{
	name: 'Numbers and SQL Server',
	ref: "Csharp\\TestTasks\\index.html"
	},
	{
	name: 'Grandfather',
	ref: "Csharp\\Grandfather\\index.html"
	}]

	this.my_java_projects = [
	{
	name: 'Statistics',
	ref: "JAVA\\Arithmetic\\arifmetika.html"
	},
	{
	name: 'Homework',
	ref: "JAVA\\Домашнее_задание\\school.html"
	},
	{
	name: 'Chess',
	ref: "JAVA\\Шахматы\\Шахматы.html"
	}]

	this.my_javascript_projects = [
	{
	name: 'Loss calculation',
	ref: "JAVASCRIPT\\poteri\\open-write-file.html"
	},
	{
	name: 'Random strings',
	ref: "JAVASCRIPT\\random_string\\random-string.html"
	}]

		this.my_angular_projects = [
	{
	name: 'List to do',
	ref: "ANGULAR\\list-to-do\\index.html"
	}]

});
