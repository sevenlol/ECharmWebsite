(function() {
    'use strict';

    angular.module('app.layout')
           .controller('headerController', headerController);

    headerController.$inject = [
        'authService',
        '$rootScope'
    ];

    function headerController(authService, $rootScope) {
        var vm = this;

        vm.signOut = signOut;

        /* public functions */

        function signOut() {
            if(!rootScope.authenticated)
                return;

            var signOutSuccessCallback = (function($rootScope) {
                return function(data) {
                    console.log('Logout succeeded!');
                    $rootScope.authenticated = false;
                    $rootScope.account = null;
                };
            })($rootScope);

            var signOutFailCallback = (function($rootScope) {
                return function(err) {
                    console.log('Logout failed!');
                };
            })($rootScope);

            authService.signOut();
        }
    }

})();