(function(){
    'use strict';

    angular.module('data')
        .service('MenuDataService', MenuDataService)
        .constant('ApiBasePath', "http://davids-restaurant.herokuapp.com")
        .constant("loadingEventName", 'spinner:activate');

    MenuDataService.$inject = ['$http', '$rootScope', 'ApiBasePath', 'loadingEventName'];
    function MenuDataService($http, $rootScope, ApiBasePath, loadingEventName){
        var service = this;
        service.getAllCategories = function(){
            $rootScope.$broadcast(loadingEventName, {on: true});
            return $http(
                {
                    method: 'GET',
                    url: ApiBasePath + "/categories.json"
                }
            ).then(function (response){
                    return response.data;
                },function (errorResponse){
                    alert("An error occured! Error message : " + errorResponse.message);
                })
                .finally(function(){
                    $rootScope.$broadcast(loadingEventName, {on: false});
                });
        };

        service.getItemsForCategory = function(categoryShortName){
            var itemsUrl = ApiBasePath + "/menu_items.json?category=" + categoryShortName;
            $rootScope.$broadcast(loadingEventName, {on: true});

            return $http(
                {
                    method: 'GET',
                    url: itemsUrl
                }
            ).then(function success(response){
                    return response.data;
                },function error(errorResponse){
                    alert("An error occured! Error message : " + errorResponse.message);
                })
                .finally(function(){
                    $rootScope.$broadcast(loadingEventName, {on: false});
                });
        };

    }

})();
