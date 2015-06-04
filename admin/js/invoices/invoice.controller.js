;(function(){
	'use strict';

	angular.module('poolApp')
		.controller('InvoiceProfileController', function($scope, $routeParams, invoiceFactory){
      var vm = this;
      var id = $routeParams.id;
      vm.date = new Date;//Moved
      vm.invoiceTotals = [];

     invoiceFactory.getInvoice(id, function(data){
        vm.invoice = data;
        // console.log(data);
        // console.log(data[2]);
        vm.leadingZeros(data[2].invoiceNumber);
        // console.log(data[0]);
        vm.subtotal(data[0]);
        // console.log(data[1]);
        vm.other(data[1]);
      });

     vm.leadingZeros = function(number){
        // console.log('leadingZeros running....');
        // console.log(number);
        vm.invoiceNumber = number.toString();
        if (vm.invoiceNumber.length === 1){
          vm.invoiceNumber = "00" + vm.invoiceNumber;
        } else if (vm.invoiceNumber.length === 2){
          vm.invoiceNumber = "0" + vm.invoiceNumber;
        } else {
        }
        return vm.invoiceNumber;
      };

      vm.subtotal = function(data){
        // console.log('subtotal running....');
        var subtotal = 0;
        var cost;
        var qty;
        // console.log(data);
        for (var i = 0; i < data.length; i++){
          // console.log(data[i].cost);
          // console.log(data[i].qty);
          var subtotalItem = data[i].cost * data[i].qty;
          subtotal += subtotalItem;
          // console.log(subtotal);
        }
        vm.invoiceTotals.push(subtotal);
      }

      vm.other = function(data){
        // console.log('other running....');
        var other = 0;
        var cost;
        var qty;
        // console.log(data);
        for (var i = 0; i < data.length; i++){
          // console.log(data[i].cost);
          // console.log(data[i].qty);
          var otherItem = data[i].cost * data[i].qty;
          other += otherItem;
          // console.log(other);
        }
        vm.invoiceTotals.push(other);
      }

    })
    .controller('ModifyInvoiceController', function($routeParams, invoiceFactory, serviceFactory, productFactory){
      var vm = this;
      var id = $routeParams.id;

      invoiceFactory.getInvoice(id, function(data){
        vm.newInvoice = data;
      });

      vm.addNewInvoice = function(){
        console.log("addNewInvoice Running")
        invoiceFactory.editInvoice(id, vm.newInvoice);
      };

      vm.leadingZeros = function(number){
        console.log('leadingZeros running....');
        console.log(number);
        vm.invoiceNumber = number.toString();
        if (vm.invoiceNumber.length === 1){
          vm.invoiceNumber = "00" + vm.invoiceNumber;
        } else if (vm.invoiceNumber.length === 2){
          vm.invoiceNumber = "0" + vm.invoiceNumber;
        } else {
        }
        return vm.invoiceNumber;
      };

      vm.serviceInput = [];
      vm.serviceMerge = {};
      vm.invoiceServiceItems = [];

      function mergeServiceData(input, data){
        var input = vm.serviceInput[0];
        var data = vm.serviceInput[1];
        var merge = vm.serviceMerge;
        // console.log('Creating serviceMerge array of objects....');
        for (var id in input){merge[id] = input[id];}
        for (var qty in input){merge[qty] = input[qty];}
        for (var name in data){merge[name] = data[name];}
        for (var cost in data){merge[cost] = data[cost];}
        // console.log(merge);
        return merge;
      }

      function resetSelectService(serviceSelect, serviceQty) {
        serviceSelect.selectedIndex = -1;
      }

      vm.addServices = function(id, qty){
        // console.log('addServices running....');
        var input = vm.serviceInput;
        // console.log(input);
        // console.log(vm.newInvoice[1])
        if (vm.newInvoice[1] === null){
          vm.newInvoice[1] = [];
        }
        // console.log(vm.newInvoice[1])
        vm.invoiceServiceItems = vm.newInvoice[1];
        // console.log('Adding input to serviceInput array....');
        input.push({id:id, qty:qty});
        serviceFactory.getService(id, function(data){
          // console.log('Getting Firebase service data....');
          // console.log(data);
          var name = data.name;
          var cost = data.cost;
          // console.log('Adding service data to serviceInput array....');
          input.push({name:name, cost:cost});
          // console.log(vm.serviceInput);
          // console.log('Merging serviceInput array indexes into serviceMerge object....');
          mergeServiceData(input[0], input[1]);
          // console.log(vm.serviceMerge);
          // console.log('Pushing serviceMerge object to invoiceServiceItems');
          vm.invoiceServiceItems.push(vm.serviceMerge);
          // console.log(vm.invoiceServiceItems);
          // console.log('Reseting serviceInput array....');
          vm.serviceMerge = {};
          vm.serviceInput = [];
          // console.log(vm.serviceInput);
        });
        resetSelectService(serviceSelect);
      }

      vm.productInput = [];
      vm.productMerge = {};
      vm.invoiceProductItems = [];

      function mergeProductData(input, data){
        var input = vm.productInput[0];
        var data = vm.productInput[1];
        var merge = vm.productMerge;
        // console.log('Creating serviceMerge array of objects....');
        for (var id in input){merge[id] = input[id];}
        for (var qty in input){merge[qty] = input[qty];}
        for (var name in data){merge[name] = data[name];}
        for (var cost in data){merge[cost] = data[cost];}
        console.log(merge);
        return merge;
      }

      function resetSelectProduct(productSelect, productQty) {
        productSelect.selectedIndex = -1;
      }

      vm.addProducts = function(id, qty){
        // console.log('addProducts running....');
        var input = vm.productInput;
        // console.log(input)
        // console.log(vm.newInvoice[0])
        if (vm.newInvoice[0] === null){
          vm.newInvoice[0] = [];
        }
        // console.log(vm.newInvoice[0])
        vm.invoiceProductItems = vm.newInvoice[0];
        // console.log('Adding input to productInput array....');
        input.push({id:id, qty:qty});
        // console.log(input);
        productFactory.getProduct(id, function(data){
          // console.log('Getting Firebase service data....');
          // console.log(data);
          var name = data.name;
          var cost = data.cost;
          // console.log('Adding product data to productInput array....');
          vm.productInput.push({name:name, cost:cost});
          // console.log(vm.productInput);
          // console.log('Merging productInput array indexes into productMerge object....');
          mergeProductData(input[0], input[1]);
          // console.log(vm.productMerge);
          // console.log('Pushing productMerge object to invoiceServiceItems');
          vm.invoiceProductItems.push(vm.productMerge);
          // console.log(vm.invoiceProductItems);
          // console.log('Reseting productInput array....');
          vm.productMerge = {};
          vm.productInput = [];
          // console.log(vm.productInput);
        });
        resetSelectProduct(productSelect);
      }

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

      vm.postInvoiceItems = [];
      vm.invoiceNumber = 1;

      function getInvoiceNumber() {
        // console.log(vm.invoiceNumber)
        invoiceNumber = getElementById("invoiceNumber");
        // console.log(invoiceNumber)
        invoiceNumber.value = vm.invoiceNumber;
        // console.log(invoiceNumber)
        vm.invoiceNumber++;
        // console.log(invoiceNumber)
      }

      vm.addNewInvoice = function(){
        var services = vm.invoiceServiceItems;
        var products = vm.invoiceProductItems;
        var customer = vm.newInvoice.customer;
        var invoiceNumber = vm.newInvoice.invoiceNumber;
        var date = new Date;
        var date = vm.newInvoice.invoiceDate;
        // console.log(services)
        // console.log(products)
        vm.postInvoiceItems.push(products, services);
        vm.postInvoiceItems.push({customer:customer, invoiceNumber:invoiceNumber, date:date})
        // console.log(vm.postInvoiceItems);
        invoiceFactory.createInvoice(vm.postInvoiceItems, function(data){
          vm.invoices = vm.postInvoiceItems || [];
          // console.log(vm.invoices);
          vm.invoices[data.firstName] = vm.newInvoice;
          // console.log(vm.newInvoice);
          vm.newInvoice = _renewInvoiceForm();
        });
      };

      vm.serviceInput = [];
      vm.serviceMerge = {};
      vm.invoiceServiceItems = [];

      function mergeServiceData(input, data){
        var input = vm.serviceInput[0];
        var data = vm.serviceInput[1];
        var merge = vm.serviceMerge;
        // console.log('Creating serviceMerge array of objects....');
        for (var id in input){merge[id] = input[id];}
        for (var qty in input){merge[qty] = input[qty];}
        for (var name in data){merge[name] = data[name];}
        for (var cost in data){merge[cost] = data[cost];}
        // console.log(merge);
        return merge;
      }

      function resetSelectService(serviceSelect, serviceQty) {
        serviceSelect.selectedIndex = -1;
      }

      vm.addServices = function(id, qty){
        // console.log(vm.newInvoice);
        // console.log('addServices running....');
        // console.log(vm.serviceInput)
        var input = vm.serviceInput;
        // console.log('Adding input to serviceInput array....');
        input.push({id:id, qty:qty});
        // console.log(input);
        serviceFactory.getService(id, function(data){
          // console.log('Getting Firebase service data....');
          // console.log(data);
          var name = data.name;
          var cost = data.cost;
          // console.log('Adding service data to serviceInput array....');
          vm.serviceInput.push({name:name, cost:cost});
          // console.log(vm.serviceInput);
          // console.log('Merging serviceInput array indexes into serviceMerge object....');
          mergeServiceData(input[0], input[1]);
          // console.log(vm.serviceMerge);
          // console.log('Pushing serviceMerge object to invoiceServiceItems');
          vm.invoiceServiceItems.push(vm.serviceMerge);
          // console.log(vm.invoiceServiceItems);
          // console.log('Reseting serviceInput array....');
          vm.serviceMerge = {};
          vm.serviceInput = [];
          // console.log(vm.serviceInput);
        });
        resetSelectService(serviceSelect);
      }

      vm.productInput = [];
      vm.productMerge = {};
      vm.invoiceProductItems = [];

      function mergeProductData(input, data){
        var input = vm.productInput[0];
        var data = vm.productInput[1];
        var merge = vm.productMerge;
        // console.log('Creating serviceMerge array of objects....');
        for (var id in input){merge[id] = input[id];}
        for (var qty in input){merge[qty] = input[qty];}
        for (var name in data){merge[name] = data[name];}
        for (var cost in data){merge[cost] = data[cost];}
        // console.log(merge);
        return merge;
      }

      function resetSelectProduct(productSelect, productQty) {
        productSelect.selectedIndex = -1;
      }

      vm.addProducts = function(id, qty){
        // console.log('addProducts running....');
        var input = vm.productInput;
        // console.log('Adding input to productInput array....');
        input.push({id:id, qty:qty});
        // console.log(input);
        productFactory.getProduct(id, function(data){
          // console.log('Getting Firebase service data....');
          // console.log(data);
          var name = data.name;
          var cost = data.cost;
          // console.log('Adding product data to productInput array....');
          vm.productInput.push({name:name, cost:cost});
          // console.log(vm.productInput);
          // console.log('Merging productInput array indexes into productMerge object....');
          mergeProductData(input[0], input[1]);
          // console.log(vm.productMerge);
          // console.log('Pushing productMerge object to invoiceServiceItems');
          vm.invoiceProductItems.push(vm.productMerge);
          // console.log(vm.invoiceProductItems);
          // console.log('Reseting productInput array....');
          vm.productMerge = {};
          vm.productInput = [];
          // console.log(vm.productInput);
        });
        resetSelectProduct(productSelect);
      }

      vm.newInvoice = _renewInvoiceForm();

      function _renewInvoiceForm(){
        return null;
      }

    });
}());