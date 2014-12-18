;(function(){
	'use strict';

	angular.module('poolApp')
		.controller('ShowController', function($routeParams, itemFactory){
      var vm = this;
      var id = $routeParams.id;
      itemFactory.getItem(id, function(data){
        vm.task = data;
      });
    })
    .controller('EditController', function($routeParams, itemFactory){
      var vm = this;
      var id = $routeParams.id;

      itemFactory.getItem(id, function(data){
        vm.newTask = data;
      });

      vm.addNewItem = function(){
        itemFactory.editItem(id, vm.newItem);
      };

    })
    .controller('ItemController', function(itemFactory){
      var vm = this;

      itemFactory.getAllItems(function(data){
        vm.items = data;
      });

      vm.addNewItem = function(){
        itemFactory.createItem(vm.newItem, function(data){
          vm.item[data.name/*Should this be changed to fistName*/] = vm.newItem;
          vm.newItem = _freshItem();
        });
      };

      vm.removeItem = function(itemId){
        itemFactory.deleteItem(itemId, function(){
          delete vm.items[itemId];
        });
      };

      vm.newItem = _freshItem();

      vm.priorityOptions = itemFactory.priorityOptions;

      function _freshItem(){
        return {
          priority: 'low'
        };
      }
    });
}());