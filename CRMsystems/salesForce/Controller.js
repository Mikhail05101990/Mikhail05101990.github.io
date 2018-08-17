/* Mikhail Pavlovich , Misha05101990@gmail.com */

var app = angular.module('linksapp', ['ngMaterial']);


app.controller('linker', function($scope)
{
  $scope.title = 'Test 1, CRM - Sales force'

  this.links1 = [{
    description: 'Guided learning parts',
    ref: "https://trailhead.salesforce.com/trails#role=role-dev"
  },
{
  description: 'Apex workbook - web version',
  ref: "https://resources.docs.salesforce.com/198/latest/en-us/sfdc/pdf/apex_workbook.pdf"
},
{
  description: 'Visualforce basics',
  ref: "https://trailhead.salesforce.com/modules/visualforce_fundamentals"
},
{
  description: 'Visualforce developer guide - web version',
  ref: "https://resources.docs.salesforce.com/sfdc/pdf/salesforce_pages_developers_guide.pdf"
},
{
  description: 'Huge number of salesforce guides',
  ref: "http://www.salesforce.com/us/developer/docs/workbook_database/workbook_database.pdf"
}];

this.site = [{
  description: 'Cloud admin cabinet',
  ref: "https://ap4.lightning.force.com/lightning/setup/SetupOneHome/home",
  login: "spech999@gmail.com",
  password: "steepsales1"
}];






});
