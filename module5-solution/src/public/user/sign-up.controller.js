(function () {
    "use strict";

    angular.module('public')
        .controller('SignUpController', SignUpController);

    SignUpController.$inject = ['MenuService', 'UserService'];
    function SignUpController(MenuService, UserService) {
        var $ctrl = this;
        var u = UserService.getUser();
        if (u==undefined) {
            $ctrl.user = {};
            $ctrl.favouriteItemShortName="";
        } else {
            $ctrl.user = u;
            $ctrl.favouriteItemShortName = u.favouriteItem.short_name;
        }
        $ctrl.favouriteItemError = false;
        $ctrl.userSaved = false;

        $ctrl.saveUser = function(){
            $ctrl.userSaved = false;
            $ctrl.checkFavourite();
            if ($ctrl.favouriteItemError) return;
            UserService.saveUser($ctrl.user);
            $ctrl.userSaved = true;
        };

        $ctrl.checkFavourite = function(){
            if ($ctrl.favouriteItemShortName === undefined || $ctrl.favouriteItemShortName == "") {
                $ctrl.favouriteItemError = true;
            } else {
                MenuService.getMenuItem($ctrl.favouriteItemShortName).then(function(response){
                    $ctrl.favouriteItemError = false;
                    $ctrl.user.favouriteItem = response;
                },function(err){
                    $ctrl.favouriteItemError = true;
                })
            }
        };
    }

})();
