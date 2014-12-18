;(function(){
	'use strict';

	angular.module('poolApp')
		.controller('ShowCustomerController', function($routeParams, customerFactory){
      var vm = this;
      var id = $routeParams.id;
      customerFactory.getCustomer(id, function(data){
        vm.customer = data;
      });
    })
    .controller('EditCustomerController', function($routeParams, customerFactory){
      var vm = this;
      var id = $routeParams.id;

      customerFactory.getCustomer(id, function(data){
        vm.newCustomer = data;
      });

      vm.addNewCustomer = function(){
        customerFactory.editCustomer(id, vm.newCustomer);
      };

    })
    .controller('CustomerController', function(customerFactory){
      var vm = this;

      customerFactory.getAllCustomers(function(data){
        vm.customers = data;
      });

      vm.addNewCustomer = function(){
        customerFactory.createCustomer(vm.newCustomer, function(data){
          vm.customers = vm.newCustomer || {};
          vm.customers[data.firstName] = vm.newCustomer;
          vm.newCustomer = _renewCustomerForm();
        });
      };

      vm.removeCustomer = function(customerId){
        customerFactory.deleteCustomer(customerId, function(){
          delete vm.customers[customerId];
        });
      };

      vm.newCustomer = _renewCustomerForm();

      function _renewCustomerForm(){
        return null;
      }
    });
}());