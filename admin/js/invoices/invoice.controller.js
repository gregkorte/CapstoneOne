;(function(){
	'use strict';

	angular.module('poolApp')
		.controller('ShowInvoiceController', function($routeParams, invoiceFactory){
      var vm = this;
      var id = $routeParams.id;

      invoiceFactory.getInvoice(id, function(data){
        vm.invoice = data;
      });

      vm.date = new Date;

    })
    .controller('EditInvoiceController', function($routeParams, invoiceFactory){
      var vm = this;
      var id = $routeParams.id;

      invoiceFactory.getInvoice(id, function(data){
        vm.newInvoice = data;
      });

      vm.addNewInvoice = function(){
        invoiceFactory.editInvoice(id, vm.newInvoice);
      };

    })
    .controller('InvoiceController', function($scope, invoiceFactory){
      var vm = this;

      invoiceFactory.getAllInvoices(function(data){
        vm.invoices = data;
      });

      vm.addNewInvoice = function(){
        invoiceFactory.createInvoice(vm.newInvoice, function(data){
          vm.invoices = vm.newInvoice || {};
          vm.invoices[data.firstName] = vm.newInvoice;
          vm.newInvoice = _renewInvoiceForm();
        });
      };

      vm.removeInvoice = function(invoiceId){
        invoiceFactory.deleteInvoice(invoiceId, function(){
          delete vm.invoices[invoiceId];
        });
      };

      var count;
      $scope.invoiceNumber = function(){
      count++;
        console.log(count);
      }



      // vm.addService = function(){
      //   vm.
      // }

      // vm.addProduct = function(){
      //   vm.
      // }

      // vm.getCosts = function(data){
      //   angular.forEach(invoices.items, function(cost){
      //     console.log(invoices.items);
      //   });
      // };

      // vm.submitInvoice = function(){
      //   var invoiceCosts = [];
      //   getCosts();
      //   $scope.invoiceCosts.push(cost);
      //   console.log(invoiceCosts);
      // };

      // vm.subtotal = function(){

      // }

      // vm.salesTax = function(){

      // }

      // vm.total = function(){

      // }

      vm.newInvoice = _renewInvoiceForm();

      function _renewInvoiceForm(){
        return null;
      }
    });
}());