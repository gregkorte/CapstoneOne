;(function(){
  'use strict';
  angular.module('poolApp')
    .config(function($routeProvider){
      $routeProvider
        .when('/', {
          templateUrl: 'views/landing.html'
        })
        .otherwise({
          redirectTo: '/'
        });
    })
}());