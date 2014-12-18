;(function(){
  'use strict';
  angular.module('poolApp')
    .factory('itemFactory', function($http, $location){

      function getAllItems(cb){
        $http.get('https://pool-management-app.firebaseio.com/data/products.json')
          .success(function(data){
            cb(data);
          })
          .error(function(err){
            console.log(err);
          });
      }

      function submitItem(item, cb){
        $http.post('https://pool-management-app.firebaseio.com/data/products.json', item)
          .success(function(data){
            $location.path('/products');
          })
          .error(function(err){
            console.log(err);
          });
      }

      function editItem(id, newItem){
        var url = 'https://pool-management-app.firebaseio.com/data/products' + id + '.json';
        $http.put(url, newItem)
          .success(function(data){
            $location.path('/' + id);
          })
          .error(function(err){
            console.log(err);
          });
      }

      function getItem(id, cb){
        var url = 'https://pool-management-app.firebaseio.com/data/products' + id + '.json';
        $http.get(url)
          .success(function(data){
            cb(data);
          })
          .error(function(err){
            console.log(err);
          });
      }

      function deleteItem(id) {
        var url = 'https://pool-management-app.firebaseio.com/data/products' + id + '.json';
        $http.delete(url)
          .success(function(data){
            $location.path('/products');
          })
          .error(function(err){
            console.log(err);
          });
      }

      return {
        getAllItems: getAllItems,
        submitItem: submitItem,
        getItem: getItem,
        editItem: editItem,
        deleteItem: deleteItem
      };
    })
}());