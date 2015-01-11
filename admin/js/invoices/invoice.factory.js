;(function(){
  'use strict';
  angular.module('poolApp')
    .factory('invoiceFactory', function($rootScope, FIREBASE_URL, $http, $location){

      function _invoiceUrl(id){
        if (id) {
          return FIREBASE_URL + '/users/' + $rootScope.user.uid +
            '/invoices/' + id + '.json?auth=' + $rootScope.user.token;
        } else {
            return FIREBASE_URL + '/users/' + $rootScope.user.uid +
            '/invoices.json?auth=' +  $rootScope.user.token;
          }
      }

      function getInvoice(id, cb){
        $http.get(_invoiceUrl(id))
          .success(function(data){
            cb(data);
          })
          .error(function(err){
            console.log('Could not get invoice');
          });
      }

      function editInvoice(id, invoice){
        $http.put(_invoiceUrl(id), invoice)
          .success(function(data){
            $location.path('/invoices');
          })
          .error(function(err){
            console.log('Could not edit invoice');
          });
      }

      function getAllInvoices(cb){
        $http.get(_invoiceUrl())
          .success(function(data){
            cb(data);
          })
          .error(function(err){
            console.log('Could not get all invoices');
          });
      }

      function createInvoice(invoice, cb){
        $http.post(_invoiceUrl(), invoice)
          .success(function(data){
            cb(data);
            $location.path('/invoices');
          })
          .error(function(err){
            console.log('Could not create invoice');
          });
      }

      function deleteInvoice(invoiceId, cb) {
        $http.delete(_invoiceUrl(invoiceId))
          .success(function(){
            cb();
            $location.path('/invoices');
          })
          .error(function(err){
            console.log('Could not delete invoice');
          });
      }

      return {
        getInvoice: getInvoice,
        editInvoice: editInvoice,
        getAllInvoices: getAllInvoices,
        createInvoice: createInvoice,
        deleteInvoice: deleteInvoice
      };
    })
}());