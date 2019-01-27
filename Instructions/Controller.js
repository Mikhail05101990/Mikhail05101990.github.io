/* Mikhail Pavlovich , Misha05101990@gmail.com */

var app = angular.module('linksapp', ['ngMaterial']);


app.controller('instructor', function($scope)
{
  $scope.title = 'Инструкция по установке Sharepoint 2016 на виртуальную машину с  Windows server 2012 R2'

  this.links = [{
    description: 'Microsoft Sync Framework Runtime v1.0 SP1 (x64)',
    ref: "http://download.microsoft.com/download/E/0/0/E0060D8F-2354-4871-9596-DC78538799CC/Synchronization.msi"
  },
{
  description: 'Microsoft® SQL Server® 2012 Native Client',
  ref: "https://www.microsoft.com/ru-RU/download/confirmation.aspx?id=50402"
},
{
  description: 'Windows Server AppFabric',
  ref: "http://go.microsoft.com/fwlink/?LinkId=235496"
},{
  description: 'Накопительный пакет обновления 7 (KB3092423) для Microsoft AppFabric 1.1',
  ref: "https://www.microsoft.com/ru-RU/download/details.aspx?id=49171"
},{
  description: 'Microsoft Identity Extensions',
  ref: "http://download.microsoft.com/download/0/1/D/01D06854-CA0C-46F1-ADBA-EBF86010DCC6/rtm/MicrosoftIdentityExtensions-64.msi"
},{
  description: 'Rights Management Service Client 2.1',
  ref: "https://www.microsoft.com/en-us/download/details.aspx?id=38396"
},{
  description: 'WCF Data Services 5.6.0 RTM Tools Installer',
  ref: "https://www.microsoft.com/en-us/download/details.aspx?id=39373"
},{
  description: 'пакет Microsoft платформа.NET Framework 4.7.2',
  ref: "http://go.microsoft.com/fwlink/?linkid=863265"
}]
    



});
