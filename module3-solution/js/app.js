(function () {
	'use strict';

	angular.module("NarrowItDownApp", [])
		.controller("NarrowItDownController", NarrowItDownController)
		.service("MenuSearchService", MenuSearchService)
		.directive("foundItems", FoundItemsDirective)
		.directive("itemsLoaderIndicator", ItemsLoaderIndicator);

	NarrowItDownController.$inject = ['$scope', 'MenuSearchService'];
	function NarrowItDownController($scope, MenuSearchService){
		var controller = this;
		controller.searchTerm = "";
		controller.found = [];
		controller.somethingToShow = false;
		controller.loading = false;
		controller.getMatchedMenuItems = function(){
			controller.loading = true;
			var promise = MenuSearchService.getMatchedMenuItems(controller.searchTerm);
			promise.then(function(foundItems){
				controller.found = foundItems;
				controller.somethingToShow = true;
				controller.loading = false;
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
			controller: FoundItemsDirectiveController,
			controllerAs: 'list',
			bindToController: true
		};
		return ddo;
	}
	function FoundItemsDirectiveController(){
		var controller = this;
		controller.emptyList = function (){
			return controller.foundItems.length===0;
		};
	}

	function ItemsLoaderIndicator(){
		return {
			restrict: 'E',
			templateUrl : 'itemsLoaderIndicator.html',
			scope: {
				loading:'<'
			}
		};
	}
})();
