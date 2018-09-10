var app = angular.module('appListToDo', ['ngMaterial']);

app.controller('ctrListToDO', function($scope, questionService) 
{
  $scope.task=questionService.newTask;
  $scope.parCverTaskPanel= "task-panel-cvernyt";
  $scope.parCverProjectPanel= "project-panel-cvernyt";
  
  $scope.parCverPrjMenu = "project-menu-hide";
  $scope.parCverEditMenu = "edit-menu-hide";

  $scope.parShowTaskBtn= "button-task-show";
  $scope.parShowTask = "task-show";
  $scope.selectProject = -1;
  $scope.activeTask = -1;
  $scope.nmbPrj = -1;
  
  $scope.newName = '';

  $scope.openTaskPanel = function (e) 
  {
    $scope.parCverTaskPanel = e.type == "click" ? "task-panel-razvernyt" : "task-panel-cvernyt";
  }

  $scope.closeTaskPanel = function (e) 
  {
    $scope.parCverTaskPanel = e.type == "click" ? "task-panel-cvernyt" : "task-panel-cvernyt";
  }
  
    $scope.openProjectPanel = function (e) 
  {
    $scope.parCverProjectPanel = e.type == "click" ? "project-panel-razvernyt" : "project-panel-cvernyt";
  }

    $scope.closeProjectPanel = function (e) 
  {
    $scope.parCverProjectPanel = e.type == "click" ? "project-panel-cvernyt" : "project-panel-cvernyt";
  }
  
    $scope.showTaskButton = function (e) 
  {
    $scope.parShowTaskBtn = e.type == "click" ? "button-task-show" : "button-task-show";
  }

    $scope.hideTaskButton = function (e) 
  {
    $scope.parShowTaskBtn = e.type == "click" ? "button-task-hide" : "button-task-show";
  }
  
      $scope.showPrjMenu = function (e) 
  {
    $scope.parCverPrjMenu = e.type == "click" ? "project-menu-show" : "project-menu-show";
  }

    $scope.hidePrjMenu = function (e) 
  {
    $scope.parCverPrjMenu = e.type == "click" ? "project-menu-hide" : "project-menu-show";
  }
  
    $scope.showEditMenu = function (e) 
  {
    if ($scope.selectProject != -1)
    {
      $scope.parCverEditMenu = e.type == "click" ? "edit-menu-show" : "edit-menu-show";
    }else
    {
      alert('Вы не выбрали проект');
    }
    
  }

    $scope.hideEditMenu = function (e) 
  {
    $scope.parCverEditMenu = e.type == "click" ? "edit-menu-hide" : "edit-menu-show";
  }

    $scope.selectItem = function($event, $index)
  {
    var list1 = angular.element(document.querySelector(".list-projects"));
    var items = list1.children().children().children().children().children();
    items.removeClass('itemPrSelect');
    var item = angular.element($event.target).addClass('itemPrSelect');
    var txt = item.text();
    var txt2 = txt.toString();
    var txt3 = txt2.split('\n');
    var txt4 = txt3.toString();
    var txt5 = txt4.split(' ');

    var namePrj = '';
    for (var i = 0; i <txt5.length; i++)
    {
      if (namePrj != '')
      {
        c = ' ';
      } else
      {
        c = '';
      }
      
      if (txt5[i] != '' && txt5[i] != ',')
      {
        var zap = txt5[i].lastIndexOf(",");
        var end = txt5[i];
        if (zap != -1)
        {
          end = txt5[i].substring(0, txt5[i].length - 1);
        }
       namePrj = namePrj + c + end;
      }      
    }
    $scope.selectProject = namePrj;
    angular.element(document.querySelector(".otctyp")).prop("value", namePrj);

    var num = -1;
 
      for (var i = 0; i<prj.length; i++)
      {
        if (prj[i].text == $scope.selectProject)
        {
            $scope.nmbPrj = i;
            break;
        }
      }
    $scope.actPrj = prj[$scope.nmbPrj];
  }
  
    $scope.showTask = function (e) 
  {
    $scope.parShowTask = e.type == "click" ? "task-show" : "task-show";
  }

    $scope.hideTask = function (e) 
  {
    $scope.parShowTask = e.type == "click" ? "task-hide" : "task-show";
  }
  
    $scope.taskDone = function($index)
  {
    if (prj[$scope.nmbPrj].tasks[$scope.activeTask].taski.length !=1)
    {
      prj[$scope.nmbPrj].tasks[$scope.activeTask].taski.splice($index, 1);
    } else
    {
      prj[$scope.nmbPrj].tasks.splice($scope.activeTask, 1);
    }
  }
  
    $scope.dayTask = function($index)
  {
    $scope.activeTask = $index;
  }
  
    $scope.projects = [];
    var prj = $scope.projects = [];
    $scope.actPrj = []; //для вывода в список текущего проекта
    
    this.addText = function(text) {
      if (text) {
        var obj = {
          text: text,
          tasks: []
        };
        prj.push(obj);
        $scope.projects = prj;
        this.nameProject = '';
      }
    }
    
  $scope.rmvPr = function() {
      if ($scope.selectProject != -1)
      {
        var num = -1;
 
        for (var i = 0; i<prj.length; i++)
        {
          if (prj[i].text == $scope.selectProject)
          {
            num = i;
            break;
          }
        }
      prj.splice(num, 1);
      $scope.selectProject = -1;
      $scope.nmbPrj = -1;
      angular.element(document.querySelector(".otctyp")).prop("value", '');
      }else
      {
        alert('Необходимо выбрать проект для удаления');
      }
    }
    
    $scope.rewritePrj = function(text) {
      if (text != '')
      {
        prj[$scope.nmbPrj].text = text; 
      }else
      {
        alert('Наименование проекта не может быть пустым');
      }
      
    }
    
    this.newTask = function(text)
	{
	var date = document.getElementById( "cal1" ),
	text = document.getElementById( "task1" );
  
  if (date.value != 'dd-mm-yy')
  {
    if (text.value != '')
    {
      if ($scope.nmbPrj != -1)
      {
        var bl = false, equals = 0;
      
        for (var i = 0; i<prj[$scope.nmbPrj].tasks.length; i++)
        {     
         if (prj[$scope.nmbPrj].tasks[i].date == date.value)
          {
           bl = true;
           equals = i;
          }
        }
    
        if (!bl)
         {
          prj[$scope.nmbPrj].tasks.push({date: date.value, taski:[{text: text.value}]});
         }else
         {
          var obj = {text: text.value};
           prj[$scope.nmbPrj].tasks[equals].taski.push(obj);
         }
      }else {alert('Создайте или выберите проект')} 
    }else {alert('Напишите задачу')}
  }else {alert('Укажите дату')}
	};
  
  




  


});









