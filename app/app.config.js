(function() {
	'use strict';

	angular.module('app')
	       .config(appConfig);

	appConfig.$inject = [
	    '$stateProvider',
	    '$urlRouterProvider',
	    '$httpProvider'
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

})();