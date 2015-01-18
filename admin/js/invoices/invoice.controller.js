;(function(){
	'use strict';

	angular.module('poolApp')
		.controller('InvoiceProfileController', function($routeParams, invoiceFactory){
      var vm = this;
      var id = $routeParams.id;
      vm.date = new Date;//Moved

      invoiceFactory.getInvoice(id, function(data){
        vm.invoice = data;

      });

    })
    .controller('ModifyInvoiceController', function($routeParams, invoiceFactory){
      var vm = this;
      var id = $routeParams.id;

      invoiceFactory.getInvoice(id, function(data){
        vm.newInvoice = data;
      });

      vm.addNewInvoice = function(){
        invoiceFactory.editInvoice(id, vm.newInvoice);
      };

    })
    .controller('ListInvoiceController', function($scope, invoiceFactory){
      var vm = this;

      invoiceFactory.getAllInvoices(function(data){
        vm.invoices = data;
        // console.log(data);
      });

      vm.removeInvoice = function(invoiceId){
        invoiceFactory.deleteInvoice(invoiceId, function(){
          delete vm.invoices[invoiceId];
        });
      };

      vm.newInvoice = _renewInvoiceForm();

      function _renewInvoiceForm(){
        return null;
      }
    })
    .controller('InvoiceController', function($scope, invoiceFactory){
      var vm = this;

      vm.addNewInvoice = function(){
        invoiceFactory.createInvoice(vm.newInvoice, function(data){
          vm.invoices = vm.newInvoice || {};
          vm.invoices[data.firstName] = vm.newInvoice;
          // vm.leadingZeros(invoiceNumber);
          // console.log(invoiceNumber);
          vm.newInvoice = _renewInvoiceForm();
        });
      };

      vm.newInvoice = _renewInvoiceForm();

      function _renewInvoiceForm(){
        return null;
      }

      // customerFactory.getAllCustomers(function(data){
      //   vm.customers = data;
      // });

      // productFactory.getAllProducts(function(data){
      //   vm.products = data;
      // });

      // serviceFactory.getAllServices(function(data){
      //   vm.services = data;
      // });

      // invoiceFactory.getAllInvoices(function(data){
      //   vm.invoices = data;
      //   console.log(data);
      // });

      // vm.leadingZeros = function(){
      //   var invoiceNumber;
      //   if (invoiceNumber.length === 1){
      //     "00" + invoiceNumber.toString();
      //   } else if (invoiceNumber.length === 2){
      //     "0" + invoiceNumber.toString();
      //   } else invoiceNumber.toString();
      // };

      // vm.invoiceService = function(){
      //   vm.
      // }

      // vm.invoiceProduct = function(){
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
      
    });
}());