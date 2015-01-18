;(function(){
  'use strict';

  angular.module('poolApp')
    .config(function($routeProvider){
      $routeProvider
	      .when('/invoices', {
	        templateUrl: 'views/invoices/invoiceList.html',
	        controller: 'ListInvoiceController',
	        controllerAs: 'list',
	        private: true
	      })
	      .when('/invoices/new', {
	        templateUrl: 'views/invoices/invoiceForm.html',
	        controller: 'InvoiceController',
	        controllerAs: 'modify',
	        private: true
	      })
	      .when('/invoices/:id', {
	        templateUrl: 'views/invoices/invoiceProfile.html',
	        controller: 'InvoiceProfileController',
	        controllerAs: 'view',
	        private: true
	      })
	      .when('/invoices/:id/edit', {
	        templateUrl: 'views/invoices/invoiceForm.html',
	        controller: 'ModifyInvoiceController',
	        controllerAs: 'modify',
	        private: true
	      })
	  })
}());