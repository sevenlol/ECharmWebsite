(function() {
	'use strict';

	angular.module('app')
	       .config(appConfig);

	appConfig.$inject = [
	    '$stateProvider',
	    '$urlRouterProvider'
	];

	function appConfig($stateProvider, $urlRouterProvider) {
	    $urlRouterProvider.otherwise("/home");

	    $stateProvider
	    .state('home', {
	        url: "/home",
	        templateUrl : 'app/layout/home.html'
	    });
	}

})();