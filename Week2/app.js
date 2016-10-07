(function () {
  'use strict';

  angular.module("Scratch", [])
  .controller("ScratchController", ScratchController)
  .filter('custom', CustomFilterFactory);

  ScratchController.$inject = ['$scope', '$filter', 'customFilter'];

  function ScratchController($scope, $filter, customFilter){
    $scope.cookieCost=.45;
    $scope.msg = "Hello";
    $scope.message = customFilter($scope.msg, "!!");
  }


  function CustomFilterFactory(){
    return function(input, arg1) {
      input = input || "";
      return input + arg1;
    };
  }

})();
