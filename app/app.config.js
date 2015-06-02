(function() {
	'use strict';

	angular.module('app')
	       .config(appConfig)
	       .run(appRun);

	appConfig.$inject = [
	    '$stateProvider',
	    '$urlRouterProvider',
	    '$httpProvider'
	];

	appRun.$inject = [
		'$rootScope'
	];

	function appConfig($stateProvider, $urlRouterProvider, $httpProvider) {
	    $urlRouterProvider.otherwise("/home");

	    $stateProvider
	    .state('home', {
	        url: "/home",
	        templateUrl : 'app/layout/home.html'
	    });

	    $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
	}

	function appRun($rootScope) {
		$rootScope.authenticated = false;
	}

})();