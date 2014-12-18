;(function(){
  'use strict';

  angular.module('poolApp')
    .config(function($routeProvider){
      $routeProvider
	      .when('/products', {
	        templateUrl: 'views/products/productList.html',
	        controller: 'ItemController',
	        controllerAs: 'item',
	        private: true
	      })
	      .when('/products/new', {
	        templateUrl: 'views/products/productForm.html',
	        controller: 'ItemController',
	        controllerAs: 'item',
	        private: true
	      })
	      .when('/products/:id', {
	        templateUrl: 'views/products/productProfile.html',
	        controller: 'ShowController',
	        controllerAs: 'item',
	        private: true
	      })
	      .when('/products/:id/edit', {
	        templateUrl: 'views/products/productForm.html',
	        controller: 'EditController',
	        controllerAs: 'item',
	        private: true
	      })
	  })
}());