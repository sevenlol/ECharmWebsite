(function() {
    'use strict';

    angular.module('app.layout')
           .controller('homeController', homeController);

    homeController.$inject = [
        'authService',
        '$rootScope'
    ];

    function homeController(authService, $rootScope) {
        var successCallback = (function($rootScope) {
            return function(res) {
                if (res.status !== 200) {
                    $rootScope.authenticated = false;
                    $rootScope.account = null;
                    return;
                }

                $rootScope.authenticated = true;
                $rootScope.account = res.data;
            };
        })($rootScope);
        var failCallback = (function($rootScope) {
            return function(res) {
                $rootScope.authenticated = false;
                $rootScope.account = null;
            };
        })($rootScope);

        // check if the user is logged in
        var promise = authService.checkAuthStatus(null, null);
        promise
            .then(successCallback)
            .catch(failCallback);
    }

})();