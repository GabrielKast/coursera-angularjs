(function(){
    'use strict';

    angular.module('data')
        .service('MenuDataService', MenuDataService)
        .constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");

    MenuDataService.$inject = ['$http', 'ApiBasePath'];
    function MenuDataService($http, ApiBasePath){
        var service = this;
        service.getAllCategories = function(){
            return $http(
                {
                    method: 'GET',
                    url: ApiBasePath + "/categories.json"
                }
            ).then(function (response){
                    console.log(response);
                    return response.data;
                },function (errorResponse){
                    alert("An error occured! Error message : " + errorResponse.message);
                });
        };

        service.getItemsForCategory = function(categoryShortName){
            var itemsUrl = ApiBasePath + "/menu_items.json?category=" + categoryShortName;
            return $http(
                {
                    method: 'GET',
                    url: itemsUrl
                }
            ).then(function success(response){
                    return response.data;
                },function error(errorResponse){
                    alert("An error occured! Error message : " + errorResponse.message);
                });
        };

    }

})();