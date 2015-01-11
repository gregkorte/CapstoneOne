;(function(){
  'use strict';
  angular.module('poolApp')
    .factory('serviceFactory', function($rootScope, FIREBASE_URL, $http, $location){

      function _serviceUrl(id){
        if (id) {
          return FIREBASE_URL + '/users/' + $rootScope.user.uid +
            '/services/' + id + '.json?auth=' + $rootScope.user.token;
        } else {
            return FIREBASE_URL + '/users/' + $rootScope.user.uid +
            '/services.json?auth=' +  $rootScope.user.token;
          }
      }

      function getService(id, cb){
        $http.get(_serviceUrl(id))
          .success(function(data){
            cb(data);
          })
          .error(function(err){
            console.log('Could not get service');
          });
      }

      function editService(id, service){
        $http.put(_serviceUrl(id), service)
          .success(function(data){
            $location.path('/services');
          })
          .error(function(err){
            console.log('Could not edit service');
          });
      }

      function getAllServices(cb){
        $http.get(_serviceUrl())
          .success(function(data){
            cb(data);
          })
          .error(function(err){
            console.log('Could not get all services');
          });
      }

      function createService(service, cb){
        $http.post(_serviceUrl(), service)
          .success(function(data){
            cb(data);
            $location.path('/services');
          })
          .error(function(err){
            console.log('Could not create service');
          });
      }

      function deleteService(serviceId, cb) {
        $http.delete(_serviceUrl(serviceId))
          .success(function(){
            cb();
            $location.path('/services');
          })
          .error(function(err){
            console.log('Could not delete service');
          });
      }

      return {
        getService: getService,
        editService: editService,
        getAllServices: getAllServices,
        createService: createService,
        deleteService: deleteService
      };
    })
}());