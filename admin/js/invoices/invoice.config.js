;(function(){
  'use strict';

  angular.module('poolApp')
    .config(function($routeProvider){
      $routeProvider
	      .when('/invoices', {
	        templateUrl: 'views/invoices/invoiceList.html',
	        controller: 'InvoiceController',
	        controllerAs: 'invoiceList',
	        private: true
	      })
	      .when('/invoices/new', {
	        templateUrl: 'views/invoices/invoiceForm.html',
	        controller: 'InvoiceController',
	        controllerAs: 'add',
	        private: true
	      })
	      .when('/invoices/:id', {
	        templateUrl: 'views/invoices/invoiceProfile.html',
	        controller: 'ShowInvoiceController',
	        controllerAs: 'show',
	        private: true
	      })
	      .when('/invoices/:id/edit', {
	        templateUrl: 'views/invoices/invoiceForm.html',
	        controller: 'EditInvoiceController',
	        controllerAs: 'add',
	        private: true
	      })
	  })
}());