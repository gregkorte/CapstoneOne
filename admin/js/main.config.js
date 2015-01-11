;(function(){
  'use strict';
  angular.module('poolApp')
    .config(function($routeProvider){
      $routeProvider
        .when('/', {
          templateUrl: 'views/nav.html'
        })
        .otherwise({
          redirectTo: '/'
        });
    })
}());