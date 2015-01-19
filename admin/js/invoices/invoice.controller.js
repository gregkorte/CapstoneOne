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

      vm.leadingZeros = function(number){
        console.log('leadingZeros running....');
        var invoiceNumber = number.toString();
        if (invoiceNumber.length === 1){
          invoiceNumber = "00" + invoiceNumber;
        } else if (invoiceNumber.length === 2){
          invoiceNumber = "0" + invoiceNumber;
        } else {
        }
        console.log(invoiceNumber);
        return invoiceNumber;
      };

      vm.addNewInvoice = function(){
        invoiceFactory.createInvoice(vm.newInvoice, function(data){
          vm.invoices = vm.newInvoice || {};
          vm.invoices[data.firstName] = vm.newInvoice;
          // vm.leadingZeros(invoiceNumber);
          // console.log(invoiceNumber);
          vm.newInvoice = _renewInvoiceForm();
        });
      };

      vm.addServices = function(){
        console.log('addServices running....')
      }

      vm.addProducts = function(){
        console.log('addProducts running....')
      }

      vm.newInvoice = _renewInvoiceForm();

      function _renewInvoiceForm(){
        return null;
      }

      // var invoiceNumber = vm.leadingZeros();
      

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