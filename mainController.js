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
  $scope.weatherLink = "weather\\index.html";

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

  this.my_crmSystems = [
  {
  name: 'Cloud org',
  ref: "CRMsystems\\salesForce\\index.html"
  }]

  this.links_git = [
    {
      name: 'Links',
      lang: '/Git',
      ref: "Links\\Git\\index.html"
    }]

  this.links_angular = [
    {
      name: 'Links',
      lang: '/Angular',
      ref: "Links\\Angular\\index.html"
    }]

  this.links_Csharp = [
    {
      name: 'Links',
      lang: '/C#',
      ref: "Links\\Csharp\\index.html"
    }]

  this.links_angular2 = [
    { name: 'Links',
      lang: '/Angular 2',
      ref: "Links\\Angular 2\\index.html"
    }]

  this.links_html = [
    { name: 'Links',
      lang: '/HTML',
      ref: "Links\\HTML\\index.html"
    }]

  this.links_js = [
    { name: 'Links',
      lang: '/js',
      ref: "Links\\Javascript\\index.html"
    }]
    
  this.links_assembler = [
    { name: 'Links',
      lang: '/assembler',
      ref: "Links\\assembler\\index.html"
    }]

  this.snippets_angular = [
  {
      name: 'Snippets',
      lang: '/Angular',
      ref: "Snippets\\Angular\\index.html"
  }]

  this.snippets_Csharp = [
  {
      name: 'Snippets',
      lang: '/C#',
      ref: "Snippets\\Csharp\\index.html"
  }]

  this.snippets_html = [
  {
      name: 'Snippets',
      lang: '/HTML',
      ref: "Snippets\\HTML\\index.html"
  }]



});
