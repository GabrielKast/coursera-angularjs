(function () {
'use strict';

angular.module("LunchCheck", [])
.controller("LunchCheckController", LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController($scope){
    $scope.menu = "";
    $scope.message = "";
    $scope.messageStyle = "";
    $scope.evaluateLunch = EvaluateLunch;
    function EvaluateLunch(){
        var items = $scope.menu;
        var nbOfDishes = 0;
        for (var item of items.split(/,/)) {
          var dish = item.trim();
          // Remove empty dishes. Do not count ,,
          // "a,,c," : should count 2 elements
          // an 'empty' item is not not counting
          if (dish !== "") {
            nbOfDishes++;
          }
        }
        if (nbOfDishes === 0) {
          $scope.message = "Please enter data first";
          $scope.messageStyle = {'border': '#a94442 solid 3px', 'border-radius':'4px'};
        } else if (nbOfDishes>3) {
          $scope.message = "Too much!";
          $scope.messageStyle = {'border': '#3c763d solid 3px', 'border-radius':'4px'};
        } else {
          $scope.message = "Enjoy!";
          $scope.messageStyle = {'border': '#3c763d solid 3px', 'border-radius':'3px'};
        }
    }
}

})();
