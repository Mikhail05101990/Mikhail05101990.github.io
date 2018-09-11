/* Mikhail Pavlovich , Misha05101990@gmail.com */

var app = angular.module('linksapp', ['ngMaterial']);


app.controller('linker', function($scope)
{
  $scope.title = 'Linux links'

  this.links1 = [{
    description: 'Basic commands',
    ref: "commands.html"
  },{
    description: 'Download latest raspbian version',
    ref: "https://www.raspberrypi.org/downloads/raspbian/"
  },{
    description: 'Working with devices in Ubuntu',
    ref: "http://itautsors.ru/ubuntu-montiruem-fleshkucddvdiso"
  },{
    description: 'Writing an image of Raspberry',
    ref: "http://www.armlinux.ru/создание-sd-карты-с-операционной-систем/"
  },{
    description: 'Seting raspberry up in Windows',
    ref: "http://wiki.amperka.ru/rpi:installation"
  },{
    description: 'Seting raspberry up in Ubuntu',
    ref: "https://dgrafov.blogspot.com/2016/06/ubuntu-raspberry-pi.html"
  }]

this.commands = [{
    description: "Connected devices",
    text:"df -h"
  },{
    description: "Connected devices",
    text:"sudo fdisk -l"
  },{
    description: "Connected devices",
    text:"lsblk"
  }]

$scope.title2 = 'Ubuntu commands'
    
    
});
