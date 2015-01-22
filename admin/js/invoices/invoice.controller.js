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
    .controller('InvoiceController', function($scope, invoiceFactory, serviceFactory, productFactory){
      var vm = this;

      vm.leadingZeros = function(number){
        console.log('leadingZeros running....');
        console.log(number);
        var invoiceNumber = number.toString();
        if (invoiceNumber.length === 1){
          invoiceNumber = "00" + invoiceNumber;
        } else if (invoiceNumber.length === 2){
          invoiceNumber = "0" + invoiceNumber;
        } else {
        }
        console.log(invoiceNumber);
        return vm.invoiceNumber;
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

      vm.serviceItems = [];

      vm.addServices = function(id, qty){
        console.log('addServices running....');
        // var service = service;
        console.log(id)
        var qty = qty;
        vm.serviceItems.push({
          service: id,
          qty: qty
        });
        console.log(vm.serviceItems);
        serviceFactory.getService(id, function(data){
          console.log(data);
          vm.serviceItems.push(data);
          console.log(vm.serviceItems)
        });
       id = null;
       qty = null;
      }

      vm.productItems = [];

      vm.addProducts = function(id, qty){
        console.log('addProducts running....')
        // var product = product;
        console.log(id)
        var qty = qty;
        vm.productItems.push({
          product: id,
          qty: qty
        });
        console.log(vm.productItems)
        productFactory.getProduct(id, function(data){
          console.log(data);
          vm.productItems.push(data);
          console.log(vm.productItems);
        });
        id = null;
        qty = null;

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