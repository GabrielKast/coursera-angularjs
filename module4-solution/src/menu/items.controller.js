(function(){
    'use strict';

    angular.module('MenuApp')
        .controller('ItemsController', ItemsController);

    ItemsController.$inject = [ '$stateParams', 'items']
    function ItemsController($stateParams, items){
        var itemsDetail = this;
        console.log(itemsDetail);
        itemsDetail.category = items.category;
        itemsDetail.menu_items = items.menu_items;
        console.log(itemsDetail);
    }
}
)();
