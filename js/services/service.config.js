;(function(){
  'use strict';

  angular.module('poolApp')
    .config(function($routeProvider){
      $routeProvider
	      .when('/services', {
	        templateUrl: 'views/services/serviceList.html',
	        controller: 'ServiceController',
	        controllerAs: 'service',
	        private: true
	      })
	      .when('/services/new', {
	        templateUrl: 'views/services/serviceForm.html',
	        controller: 'ServiceController',
	        controllerAs: 'add',
	        private: true
	      })
	      .when('/services/:id', {
	        templateUrl: 'views/services/serviceProfile.html',
	        controller: 'ShowServiceController',
	        controllerAs: 'show',
	        private: true
	      })
	      .when('/services/:id/edit', {
	        templateUrl: 'views/services/serviceForm.html',
	        controller: 'EditServiceController',
	        controllerAs: 'add',
	        private: true
	      })
	  })
}());