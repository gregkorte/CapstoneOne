;(function(){
  'use strict';
  angular.module('poolApp')
    .factory('customerFactory', function($rootScope, FIREBASE_URL, $http, $location){

      function _customerUrl(id){
        if (id) {
          return FIREBASE_URL + '/users/' + $rootScope.user.uid +
            '/customers/' + id + '.json?auth=' + $rootScope.user.token;
          } else {
              return FIREBASE_URL + '/users/' + $rootScope.user.uid +
              '/customers.json?auth=' +  $rootScope.user.token;
            }
        }

      function getCustomer(id, cb){
        $http.get(_customerUrl(id))
          .success(function(data){
            cb(data);
          })
          .error(function(err){
            console.log('Could not get customer');
          });
      }

      function editCustomer(id, customer){
        $http.put(_customerUrl(id), customer)
          .success(function(data){
            $location.path('/customers/');
          })
          .error(function(err){
            console.log('Could not edit customer');
          });
      }

      function getAllCustomers(cb){
        $http.get(_customerUrl())
          .success(function(data){
            cb(data);
          })
          .error(function(err){
            console.log('Could not get all customers');
          });
      }

      function createCustomer(customer, cb){
        $http.post(_customerUrl(), customer)
          .success(function(data){
            cb(data);
            $location.path('/customers/');
          })
          .error(function(err){
            console.log('Could not create customer');
          });
      }

      function deleteCustomer(customerId, cb) {
        $http.delete(_customerUrl(customerId))
          .success(function(){
            cb();
          })
          .error(function(err){
            console.log('Could not delete customer');
          });
      }

      return {
        getCustomer: getCustomer,
        editCustomer: editCustomer,
        getAllCustomers: getAllCustomers,
        createCustomer: createCustomer,
        deleteCustomer: deleteCustomer
      };
    })
}());