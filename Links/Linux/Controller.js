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
    description: 'Writting an image of Raspberry',
    ref: "http://www.armlinux.ru/создание-sd-карты-с-операционной-систем/"
  },{
    description: 'Setting raspberry up in Windows',
    ref: "http://wiki.amperka.ru/rpi:installation"
  },{
    description: 'Setting raspberry up in Ubuntu',
    ref: "https://dgrafov.blogspot.com/2016/06/ubuntu-raspberry-pi.html"
  },{
    description: "Setting SSH keys on the Raspberry",
    ref:"https://kamilslab.com/2016/12/17/how-to-set-up-ssh-keys-on-the-raspberry-pi/"
  },{
    description:"Set wpa_supplicant",
    ref:"https://habr.com/post/315960/"
  },{
    description:"Firefox extensions",
    ref:"https://addons.mozilla.org/en-US/firefox/"
  },{
    description:"Install addons-linter",
    ref:"https://github.com/mozilla/addons-linter/"
  },{
    description:"Install Viber",
    ref:"https://losst.ru/ustanovka-viber-v-ubuntu-16-04"
  },{
    description:"Install VMWare pro",
    ref:"https://linuxconfig.org/how-to-install-vmware-workstation-on-ubuntu-18-04-bionic-beaver-linux"
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
  },{
    description: "UUID and filesystem type of devices",
    text:"blkid"
  },{
    description: "Create a catalog",
    text:"sudo mkdir /media/RaspiFlash"
  },{
    description: "Writting rights",
    text:"sudo chmod 777 /media/RaspiFlash"
  },{
    description: "Mount a fat partition",
    text: "sudo mount -t vfat /dev/mmcblk0p1 /media/RaspiFlash"
  },{
    description: "Mount a partition with filesystem autodetecting",
    text:"sudo mount /dev/mmcblk0p2 /media/RaspiRoot"
  },{
    description: "Unmount a device",
    text:"sudo umount /media/RaspiRoot"
  },{
    description: "Writting of an img",
    text: "sudo dd if=/media/misha/hdd/myRaspImg.img of=/dev/mmcblk0"
  },{
    description: "Deleting a file in Ubuntu",
    text:"sudo rm -v  /media/RaspiRoot/ssh"
  },{
    description:"Erase a disk",
    text:"sudo dd if=/dev/zero of=/dev/mmcblk0 bs=4k && sync"
  },{
      description:"Create zip",
      text: "zip -r ../NewExtension.xpin.xpi * "
  },{
      description:"Install deb",
      text: "sudo dpkg -i ~/Downloads/viber-for-linux-4-2-2-6-en-ubu.deb"
  },{
      description:"Install dependences",
      text: "sudo apt-get install -f"
  },{
      description:"Installed packages",
      text: "dpkg --list"
  },{
      description:"Remove with dependences",
      text: "sudo apt autoremove viber"
  },{
      description:"Remove a file",
      text: "sudo rm -rf /opt/firefox-64.0.tar.bz2"
  },{
      description:"Move a directory",
      text: "sudo mv /media/misha/HEAVYFLASH/firefox /opt"
  },{
      description:"Create an iso",
      text: "sudo mkisofs -o /media/misha/hdd/PrerequisiesSP16.iso -U /media/misha/hdd/PrerequisitesSP16"
  },{
      description:"Scan a host for any devices on a 22 port",
      text: "nmap -p 22 192.168.100.*"
  },{
      description:"Connect to raspi",
      text: "ssh pi@192.168.100.52"
  }]

    
    
$scope.title2 = 'Ubuntu commands'
    
    
});
