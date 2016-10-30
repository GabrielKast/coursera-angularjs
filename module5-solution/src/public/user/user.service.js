(function () {
    "use strict";

    angular.module('public')
        .service('UserService', UserService);

    // UserService.$inject = ['$http', 'ApiPath'];
    function UserService() {
        var service = this;
        var user = {};
        service.saveUser = function (aUser) {
            user = aUser;
        };
        service.getUser = function () {
            return user;
        };
    }



})();
