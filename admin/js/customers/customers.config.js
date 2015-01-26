;(function(){
  'use strict';

  angular.module('poolApp')
    .config(function($routeProvider){
      $routeProvider
	      .when('/customers', {
	        templateUrl: 'views/customers/customerList.html',
	        controller: 'ListCustomersController',
	        controllerAs: 'customerList',
	        private: true
	      })
	      .when('/customers/new', {
	        templateUrl: 'views/customers/customerForm.html',
	        controller: 'CustomerController',
	        controllerAs: 'add',
	        private: true
	      })
	      .when('/customers/:id', {
	        templateUrl: 'views/customers/customerProfile.html',
	        controller: 'ShowCustomerController',
	        controllerAs: 'show',
	        private: true
	      })
	      .when('/customers/:id/edit', {
	        templateUrl: 'views/customers/customerForm.html',
	        controller: 'EditCustomerController',
	        controllerAs: 'add',
	        private: true
	      })
	  })
}());