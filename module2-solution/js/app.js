(function () {
    'use strict';

    angular.module("ShoppingListCheckOff", [])
	.controller("ToBuyController", ToBuyController)
	.controller("AlreadyBoughtController", AlreadyBoughtController)
	.service("ShoppingListCheckOffService", ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService){
	var toBuy = this;
	toBuy.messages = { empty : "Everything is bought !" };
	toBuy.list = ShoppingListCheckOffService.getToBuyList();
	toBuy.markAsAlreadyBought = function(index){
	    ShoppingListCheckOffService.markAsAlreadyBought(index);
	};
	toBuy.isEmptyList = function(){
	    return toBuy.list.length === 0;
	};
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
	var alreadyBought = this;
	alreadyBought.messages = { empty : "Nothing bought yet." };
	alreadyBought.list = ShoppingListCheckOffService.getAlreadyBoughtList();
	alreadyBought.isEmptyList = function(){
	    return alreadyBought.list.length === 0;
	};
    }

    function ShoppingListCheckOffService(){
	var service = this;
	var toBuyList = 
	 [
	     { name:"carrots", quantity: 10},
	     { name:"milk", quantity: 2},
	     { name:"bananas", quantity: 5},
	     { name:"steak", quantity: 4},
	     { name:"yoghurt", quantity: 12}
	 ];
	var alreadyBoughtList = [];

	service.markAsAlreadyBought = function(index){
	    var item = toBuyList[index];
	    toBuyList.splice(index, 1);
	    alreadyBoughtList.push(item);
	};


	service.getToBuyList = function() {
	    return toBuyList;
	};
	service.getAlreadyBoughtList = function() {
	    return alreadyBoughtList;
	};
    }
})();
