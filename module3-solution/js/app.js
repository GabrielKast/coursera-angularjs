(function () {
	'use strict';

	angular.module("NarrowItDownApp", [])
		.controller("NarrowItDownController", NarrowItDownController)
		.service("MenuSearchService", MenuSearchService)
		.directive("foundItems", FoundItemsDirective)
//		.controller("FoundItemsDirectiveController", FoundItemsDirectiveController)
	;

	NarrowItDownController.$inject = ['$scope', 'MenuSearchService'];
	function NarrowItDownController($scope, MenuSearchService){
		var controller = this;
		controller.searchTerm = "soup";
		controller.found = []
		controller.getMatchedMenuItems = function(){
			var promise = MenuSearchService.getMatchedMenuItems(controller.searchTerm);
			promise.then(function(foundItems){
				controller.found = foundItems;
			});
		}
		controller.removeItem = function (itemIndex) {
			controller.found.splice(itemIndex, 1);
		};

	}

	MenuSearchService.$inject = ['$http'];
	function MenuSearchService ($http){
		var service = this;

		service.getMatchedMenuItems = function(searchTermRaw){
			// TODO Add Config
			return $http({url: "https://davids-restaurant.herokuapp.com/menu_items.json"}).then(
				function success(response) {
					// process response and only keep items that match
					var foundItems = [],
						searchTerm = searchTermRaw.toLowerCase(),
						menu_items = response.data.menu_items;
					console.log(response);
					// Here check if data and menu_items are empty
					for (var i=0; i<menu_items.length; i++) {
						var item = menu_items[i],
							name = item.name.toLowerCase(),
							description = item.description.toLowerCase();
						if (name.indexOf(searchTerm)>=0 || description.indexOf(searchTerm)>=0) {
							foundItems.push(item);
						}
					}
					// return processed items
					return foundItems;
				},
				function error(response) {
					alert(response);
				}
			);
		}
	}

	function FoundItemsDirective (){
		var ddo = {
			restrict: 'E',
			templateUrl : 'foundItems.html',
			scope : {
				foundItems: '<',
				removeItem: '&onRemove'
			},
			// controller: 'ShoppingListDirectiveController as list',
			controller: FoundItemsDirectiveController,
			controllerAs: 'list',
			bindToController: true
		};
		return ddo;
	}
	function FoundItemsDirectiveController(){
	}
})();
