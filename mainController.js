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
	ref: "Projects\\Csharp\\BusTicketShop\\index.html"
	},
	{
	name: 'Student list',
	ref: "Projects\\Csharp\\Students\\index.html"
	},
	{
	name: 'Numbers and SQL Server',
	ref: "Projects\\Csharp\\TestTasks\\index.html"
	},
	{
	name: 'Grandfather',
	ref: "Projects\\Csharp\\Grandfather\\index.html"
	}]

	this.my_java_projects = [
	{
	name: 'Statistics',
	ref: "Projects\\JAVA\\Арифметика\\arifmetika.html"
	},
	{
	name: 'Homework',
	ref: "Projects\\JAVA\\Домашнее_задание\\index.html"
	},
	{
	name: 'Chess',
	ref: "Projects\\JAVA\\Шахматы\\index.html"
	}]

	this.my_javascript_projects = [
	{
	name: 'Loss calculation',
	ref: "Projects\\JAVASCRIPT\\poteri\\open-write-file.html"
	},
	{
	name: 'Random strings',
	ref: "Projects\\JAVASCRIPT\\random_string\\random-string.html"
	}]

    this.my_projects = [
    {
    name: 'Converter',
	ref: "Projects\\myProjects\\JS\\htmlText\\index.html",
    lang: "JS",
    color: "#FFB4F0"
    },{
    name: 'Html structure',
	ref: "Projects\\myProjects\\JS\\htmlStructure\\index.html",
    lang: "JS",
    color: "#FFB4F0"
    },{
	name: 'List to do',
	ref: "Projects\\myProjects\\ANGULAR\\list-to-do\\index.html",
    lang: "Angular",
    color: "#B5C294"
	}]


  this.my_crmSystems = [
  {
  name: 'Cloud org',
  ref: "Projects\\CRMsystems\\salesForce\\index.html"
  }]

    this.links_linux = [
    {
      name: 'Links',
      lang: '/LINUX',
      ref: "Links\\Linux\\index.html"
    }]

    this.links_extensions = [
    {
      name: 'Links',
      lang: '/Extensions',
      ref: "Links\\Extensions\\index.html"
    }]
    
    this.links_drivers = [
    {
      name: 'Links',
      lang: '/Drivers',
      ref: "Links\\Drivers\\index.html"
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
    
  this.links_stuff = [
    { name: 'Links',
      lang: '/stuff',
      ref: "Links\\Stuff\\index.html"
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

  this.notRelatedLinks=[{
    description: 'Mailchimp(send messages)',
    ref: "https://mailchimp.com/help/"
  },{
    description: 'Google API',
    ref: "https://cloud.google.com/translate/docs/"
  },{
    description: 'Google API and JS',
    ref: "https://codepen.io/allurewebsolutions/pen/BRdZdB"
  }]
    
  this.guidlines = [
  {
    description: 'Sharepoint 2016 setup',
    ref: "Instructions\\index.html"
  }]
    
    

});
