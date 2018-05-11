/* Mikhail Pavlovich , Misha05101990@gmail.com */

var app = angular.module('appListToDo', ['ngMaterial']);

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

		this.my_angular_projects = [
	{
	name: 'Список дел',
	ref: "ANGULAR\\list-to-do\\index.html"
	}]














});
