(function () {
    'use strict';

    angular.module('MenuApp')
        .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {

        // Redirect to home page if no other URL matches
        $urlRouterProvider.otherwise('/');

        // *** Set up UI states ***
        $stateProvider

            // Home page
            .state('home', {
                url: '/',
                templateUrl: 'src/menu/templates/home.template.html'
            })
            // Categories list page
            .state('categories', {
                url: '/categories',
                template: '<categories items="categories.items"></categories>',
                controller: 'CategoriesController',
                controllerAs: 'categories',
                resolve: {
                    items: ['MenuDataService', function (MenuDataService) {
                        return MenuDataService.getAllCategories();
                    }]
                }
            })
            .state('categories.detail', {
                url: '/detail/{categoryId}',
                templateUrl: 'src/menu/templates/categoriesdetail.template.html',
                controller: 'CategoryDetailController',
                controllerAs: 'detail',
                params: {
                    categoryId:null
                }
            })

            // Category detail page
              .state('items', {
                url: '/categories/{categoryShortName}',
                template: '<items menu-items="itemsDetail.menu_items" category="itemsDetail.category"></items>',
                controller: 'ItemsController as itemsDetail',
                resolve: {
                    items: ['$stateParams', 'MenuDataService',
                        function ($stateParams, MenuDataService) {
                            var  categoryShortName = $stateParams.categoryShortName;
                            return MenuDataService.getItemsForCategory(categoryShortName);
                        }]
                }
                //, params: {
                //    categoryName:null
                //}
              })
        ;

    }

})();
