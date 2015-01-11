;(function(){
  'use strict';
  angular.module('poolApp')
    .factory('productFactory', function($rootScope, FIREBASE_URL, $http, $location){

      function _productUrl(id){
        if (id) {
          return FIREBASE_URL + '/users/' + $rootScope.user.uid +
            '/products/' + id + '.json?auth=' + $rootScope.user.token;
        } else {
            return FIREBASE_URL + '/users/' + $rootScope.user.uid +
            '/products.json?auth=' +  $rootScope.user.token;
          }
      }

      function getProduct(id, cb){
        $http.get(_productUrl(id))
          .success(function(data){
            cb(data);
          })
          .error(function(err){
            console.log('Could not get product');
          });
      }

      function editProduct(id, product){
        $http.put(_productUrl(id), product)
          .success(function(data){
            $location.path('/products' /*+ id*/);
          })
          .error(function(err){
            console.log('Could not edit product');
          });
      }

      function getAllProducts(cb){
        $http.get(_productUrl())
          .success(function(data){
            cb(data);
          })
          .error(function(err){
            console.log('Could not get all products');
          });
      }

      function createProduct(product, cb){
        $http.post(_productUrl(), product)
          .success(function(data){
            cb(data);
            $location.path('/products');
          })
          .error(function(err){
            console.log('Could not create product');
          });
      }

      function deleteProduct(productId, cb) {
        $http.delete(_productUrl(productId))
          .success(function(){
            cb();
            $location.path('/products');
          })
          .error(function(err){
            console.log('Could not delete product');
          });
      }

      return {
        getProduct: getProduct,
        editProduct: editProduct,
        getAllProducts: getAllProducts,
        createProduct: createProduct,
        deleteProduct: deleteProduct
      };
    })
}());