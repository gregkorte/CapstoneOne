;(function(){
	'use strict';

	angular.module('poolApp')
		.controller('InvoiceProfileController', function($routeParams, invoiceFactory){
      var vm = this;
      var id = $routeParams.id;
      vm.date = new Date;//Moved

      vm.leadingZeros = function(number){
        console.log('leadingZeros running....');
        vm.invoiceNumber = number.toString();
        if (vm.invoiceNumber.length === 1){
          vm.invoiceNumber = "00" + vm.invoiceNumber;
        } else if (vm.invoiceNumber.length === 2){
          vm.invoiceNumber = "0" + vm.invoiceNumber;
        } else {
        }
        console.log(vm.invoiceNumber);
        return vm.invoiceNumber;
      };

      invoiceFactory.getInvoice(id, function(data){
        vm.invoice = data;
        vm.leadingZeros(data.invoiceNumber);
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

      vm.addNewInvoice = function(){
        invoiceFactory.createInvoice(vm.newInvoice, function(data){
          vm.invoices = vm.newInvoice || {};
          vm.invoices[data.firstName] = vm.newInvoice;
          vm.newInvoice = _renewInvoiceForm();
        });
      };

      // function mergeInvoiceData(services, products){
      //   var input = vm.serviceInput[0];
      //   var data = vm.serviceInput[1];
      //   var invoice = vm.invoiceService;
      //   for (var id in input){invoice[id] = input[id];}
      //   for (var name in data){invoice[name] = data[name];}
      //   return invoice;
      // }

      vm.serviceInput = [];
      vm.invoiceService = {};
      vm.invoiceServiceItem = [];

      function mergeServiceData(input, data){
        var input = vm.serviceInput[0];
        var data = vm.serviceInput[1];
        var invoice = vm.invoiceService;
        for (var id in input){invoice[id] = input[id];}
        for (var name in data){invoice[name] = data[name];}
        return invoice;
      }

      function resetSelectService(serviceSelect, serviceQty) {
        serviceSelect.selectedIndex = -1;
      }

      vm.addServices = function(id, qty){
        console.log('addServices running....');
        var input = vm.serviceInput;
        input.push({
          serviceid: id,
          qty: qty
        });
        serviceFactory.getService(id, function(data){
          input.splice(1, 0, data);
          console.log(data);
          mergeServiceData(input[0], input[1]);
          vm.invoiceServiceItem.push(vm.invoiceService);
          console.log(vm.invoiceServiceItem);
        });
        resetSelectService(serviceSelect);
      }

      vm.productInput = [];
      vm.invoiceProduct = {};
      vm.invoiceProductItem = [];

      function mergeProductData(input, data){
        var input = vm.productInput[0];
        var data = vm.productInput[1];
        var invoice = vm.invoiceProduct;
        for (var id in input){invoice[id] = input[id];}
        for (var qty in input){ invoice[qty] = input[qty];}
        for (var name in data){invoice[name] = data[name];}
        for (var cost in data){invoice[cost] = data[cost];}
        return invoice;
      }

      function resetSelectProduct(productSelect, productQty) {
        productSelect.selectedIndex = -1;
      }

      vm.addProducts = function(id, qty){
        console.log('addProducts running....');
        var input = vm.productInput;
        input.push({
          product: id,
          qty: qty
        });
        productFactory.getProduct(id, function(data){
          input.splice(1, 0, data);
          mergeProductData(input[0], input[1]);
          vm.invoiceProductItem.push(vm.invoiceProduct);
          console.log(vm.invoiceProductItem);
        });
        resetSelectProduct(productSelect);
      }

      vm.newInvoice = _renewInvoiceForm();

      function _renewInvoiceForm(){
        return null;
      }

    });
}());