(function () {
    'use strict';

    angular.module('MenuApp')
        .controller('CategoryDetailController', CategoryDetailController);

    CategoryDetailController.$inject = ['$stateParams', 'items'];
    function CategoryDetailController($stateParams, items) {
        var detail = this;
        console.log('$stateParams.categoryId:', $stateParams.categoryId);
        var categoryId = parseInt($stateParams.categoryId, 10);
        for (var i=0; i< items.length; i++) {
            if (items[i].id === categoryId){
                detail.item = items[i];
                return;
            }
        }
        detail.item = [];
        return;
    }
})();
