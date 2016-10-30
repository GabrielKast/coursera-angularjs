(function () {
  "use strict";

  angular.module('public')
      .controller('UserController', UserController);

  UserController.$inject = ['user', 'ApiPath'];
  function UserController(user, ApiPath) {
    var userCtrl = this;
    userCtrl.user = user;
    userCtrl.basePath = ApiPath;
    userCtrl.isUserDefined = function(){
      return userCtrl.user!==undefined;
    };
  }

})();
