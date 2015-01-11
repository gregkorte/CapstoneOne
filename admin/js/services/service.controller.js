;(function(){
	'use strict';

	angular.module('poolApp')
		.controller('ShowServiceController', function($routeParams, serviceFactory){
      var vm = this;
      var id = $routeParams.id;
      serviceFactory.getService(id, function(data){
        vm.service = data;
      });
    })
    .controller('EditServiceController', function($routeParams, serviceFactory){
      var vm = this;
      var id = $routeParams.id;

      serviceFactory.getService(id, function(data){
        vm.newService = data;
      });

      vm.addNewService = function(){
        serviceFactory.editService(id, vm.newService);
      };

    })
    .controller('ServiceController', function(serviceFactory){
      var vm = this;

      serviceFactory.getAllServices(function(data){
        vm.services = data;
      });

      vm.addNewService = function(){
        serviceFactory.createService(vm.newService, function(data){
          vm.services = vm.newService || {};
          vm.services[data.name] = vm.newService;
          vm.newService = _renewServiceForm();
        });
      };

      vm.removeService = function(serviceId){
        serviceFactory.deleteService(serviceId, function(){
          delete vm.services[serviceId];
        });
      };

      vm.newService = _renewServiceForm();

      function _renewServiceForm(){
        return null;
      }
    });
}());