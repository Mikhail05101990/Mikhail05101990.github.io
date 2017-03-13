/* Mikhail Pavlovich , Misha05101990@gmail.com */

var app = angular.module('appListToDo', ['ngMaterial']);

app.controller('ctrListToDO', function($scope) 
{
  
  $scope.parCverProjectPanel= "project-panel-razvernyt";
  
    $scope.openProjectPanel = function (e) 
  {
        $scope.parCverProjectPanel = e.type == "click" ? "project-panel-razvernyt" : "project-panel-cvernyt";
  }

    $scope.closeProjectPanel = function (e) 
  {
        $scope.parCverProjectPanel = e.type == "click" ? "project-panel-cvernyt" : "project-panel-cvernyt";
  }
  
  $scope.count = 0;
  $scope.item = 'Generated ' + $scope.count + ' of 25';
  

    this.projects = []

    this.addText = function(text) {
		
		var par2 = true;
		while(par2 == true)
		{
		
		var max = 4, min = 0, par = true, count = 0,
          rand1 = Math.floor(Math.random() * (max - min + 1)) + min,
		  rand2 = Math.floor(Math.random() * (max - min + 1)) + min,
		  obj = {
          text: this.adjectives[rand1] + ' ' + this.cities[rand2]
        };

		for(var i = 0; i < this.projects.length; i++) 
    {
		var oStr = new String(this.projects[i].text);
        if(oStr == obj.text) 
		{
			par = false
		}
    }
		
		if(par!=false)
			{
			par2 = false;
			}
		
		}
		
	
		var str2 = new String(obj.text),
		str3 = str2[0].toUpperCase(),
		str = str3 + str2.substr(1);
		
        this.projects.push(obj.text);
        this.nameProject = str;
		if((this.textTask == undefined))
		{
			this.textTask = str;
		} 
		else
			{
			this.textTask = str + '\n' + this.textTask;
			}

	}

	
	this.adjectives = ['large', 'fabulous', 'important', 'public', 'bad']
	this.cities = ['Budapest', 'Buenos Aires', 'Cairo', 'Minsk', 'Cape Town']
	
	$scope.counterUp = function() {
		$scope.count += 1;
		$scope.item = 'Generated ' + $scope.count + ' of 25';
		if($scope.count == 25)
		{
			btn1.disabled = "disabled";
		}
	}

	this.my_java_projects = [
	{
	name: 'Статистика',
	ref: "JAVA\\Арифметика\\arifmetika.html"
	},
	{
	name: 'Домашнее задание',
	ref: "JAVA\\Домашнее_задание\\school.html"
	},
	{
	name: 'Шахматы',
	ref: "JAVA\\Шахматы\\Шахматы.html"		
	}]
	
	
	
	
	
	this.my_javascript_projects = [
	{
	name: 'Расчет потерь',
	ref: "JAVASCRIPT\\poteri\\open-write-file.html"
	},
	{
	name: 'Случайные строки',
	ref: "JAVASCRIPT\\random_string\\random-string.html"		
	}]

	
	
	
	
	
	
	
	
	
	
	
	



});









