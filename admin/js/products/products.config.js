;(function(){
  'use strict';

  angular.module('poolApp')
    .config(function($routeProvider){
      $routeProvider
	      .when('/products', {
	        templateUrl: 'views/products/productList.html',
	        controller: 'ProductController',
	        controllerAs: 'productList',
	        private: true
	      })
	      .when('/products/new', {
	        templateUrl: 'views/products/productForm.html',
	        controller: 'ProductController',
	        controllerAs: 'add',
	        private: true
	      })
	      .when('/products/:id', {
	        templateUrl: 'views/products/productProfile.html',
	        controller: 'ShowProductController',
	        controllerAs: 'show',
	        private: true
	      })
	      .when('/products/:id/edit', {
	        templateUrl: 'views/products/productForm.html',
	        controller: 'EditProductController',
	        controllerAs: 'add',
	        private: true
	      })
	  })
}());