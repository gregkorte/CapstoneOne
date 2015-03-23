;(function(){
  angular.module('poolApp')
    .config(function($routeProvider){
      $routeProvider
	      .when('/login', {
	        templateUrl: 'views/auth/login.html',
	        controller: 'LoginController',
	        controllerAs: 'login',
	        resolve: {
	          data: function(authFactory){
	            authFactory.disallowLogin();
	          }
	        }
	      })
	      .when('/logout', {
	        template: '',
	        controller: 'LogoutController'
	      })
	      .when('/changepassword', {
	        templateUrl: 'views/auth/changepassword.html',
	        controller: 'ChangePasswordController',
	        controllerAs: 'changepw',
	        private: true
	      })
	      .otherwise({
	      	redirectTo: '/login'
	      })
	  })
	      .run(function($rootScope, authFactory){
		      $rootScope.$on('$routeChangeStart', function(event, nextRoute, priorRoute){
		        if (nextRoute.$$route && nextRoute.$$route.private) {
		          authFactory.requireLogin();
		        }
		      })
		    })
}());