(function () {
'use strict';

angular.module("NameCalculator", [])
.controller("NameCalculatorController", function($scope){
  $scope.name="";
  $scope.totalValue=0;
  $scope.displayNumeric = function(){
    var total = calculateNumeric($scope.name);
    $scope.totalValue = total;

  };
  function calculateNumeric(string){
    var totalStringValue=0;
    for (var i = 0; i < string.length; i++) {
      totalStringValue += string.charCodeAt(i);
    }
    return totalStringValue;
  }
});

})();
