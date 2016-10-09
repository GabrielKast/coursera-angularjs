(function() {
  "use strict";

  angular.module('common')
      .component('loading', {
        template: '<img class="spinner" src="images/spinner.svg" ng-if="$ctrl.showSpinner">',
        controller: LoadingController
      });

  LoadingController.$inject = ['$rootScope'];
  function LoadingController ($rootScope) {
    var $ctrl = this;
    var cancel;
    $ctrl.$onInit = function() {
      $ctrl.showSpinner = false;
      cancel = $rootScope.$on('spinner:activate', onSpinnerActivate);
    };

    $ctrl.$onDestroy = function() {
      cancel();
    };

    function onSpinnerActivate(event, data) {
      $ctrl.showSpinner = data.on;
    }
  }

})();
