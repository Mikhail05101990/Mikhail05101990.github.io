/* Mikhail Pavlovich , Misha05101990@gmail.com */

var app = angular.module('linksapp', ['ngMaterial']);


app.controller('linker', function($scope)
{
  $scope.title = 'Test 1, CRM - Sales force'

  this.links1 = [{
    description: 'link 1',
    ref: "https://trailhead.salesforce.com"
  },
{
  description: 'link2',
  ref: "https://resources.docs.salesforce.com/198/latest/en-us/sfdc/pdf/apex_workbook.pdf"
},
{
  description: 'link3',
  ref: "https://trailhead.salesforce.com/modules/visualforce_fundamentals"
},
{
  description: 'link4',
  ref: "https://resources.docs.salesforce.com/sfdc/pdf/salesforce_pages_developers_guide.pdf"
},
{
  description: 'link5',
  ref: "http://www.salesforce.com/us/developer/docs/workbook_database/workbook_database.pdf"
}];

this.site = [{
  description: 'Cloud admin cabinet',
  ref: "https://ap4.lightning.force.com/lightning/setup/SetupOneHome/home"
}];






});
