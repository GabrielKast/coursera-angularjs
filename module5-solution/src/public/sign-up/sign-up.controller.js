(function () {
    "use strict";

    angular.module('public')
        .controller('SignUpController', SignUpController);

    SignUpController.$inject = ["MenuService"];
    function SignUpController(MenuService) {
        var $ctrl = this;
        $ctrl.user = {};
        $ctrl.user.favouriteItem = {};
        $ctrl.favouriteItemShortName = "";
        $ctrl.favouriteItemError = false;
        $ctrl.checkFavourite = function(){
            if ($ctrl.favouriteItemShortName === undefined || $ctrl.favouriteItemShortName == "") {
                $ctrl.favouriteItemError = true;
            } else {
                MenuService.getMenuItem($ctrl.favouriteItemShortName).then(function(response){
                    $ctrl.favouriteItemError = false;
                    console.log(response);
                    $ctrl.user.favouriteItem = response;
                },function(err){
                    console.log("error", err);
                    $ctrl.favouriteItemError = true;
                })
            }
        };
    }

})();
