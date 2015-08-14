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
        '$rootScope',
        '$window'
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

    function appRun($rootScope, $window) {
        $rootScope.authenticated = false;
        $rootScope.$on("$stateChangeSuccess", function (event, currentRoute, previousRoute) {
            $window.scrollTo(0, 0);
        });
        // facebook like and share
        $rootScope.facebookAppId = '[1480760568901096]'; // set your facebook app id here
    }

})();