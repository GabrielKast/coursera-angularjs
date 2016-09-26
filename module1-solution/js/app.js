(function () {
'use strict';

angular.module("LunchCheck", [])
.controller("LunchCheckController", LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController($scope){
    $scope.menu = "";
    $scope.message = "";
    $scope.messageClass = "";
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
          $scope.messageClass = "message-danger";
        } else if (nbOfDishes>3) {
          $scope.message = "Too much!";
          $scope.messageClass = "message-success";
        } else {
          $scope.message = "Enjoy!";
          $scope.messageClass = "message-success";
        }
    }
}

})();
