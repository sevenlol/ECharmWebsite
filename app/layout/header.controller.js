(function() {
    'use strict';

    angular.module('app.layout')
           .controller('headerController', headerController);

    headerController.$inject = [
        'authService',
        '$rootScope',
        '$state'
    ];

    function headerController(authService, $rootScope, $state) {
        var vm = this;

        vm.signOut = signOut;
        vm.isCollapsed = true;
        vm.collapse = collapse;

        /* public functions */

        function signOut() {
            if(!$rootScope.authenticated)
                return;

            var signOutSuccessCallback = (function($rootScope, $state) {
                return function(data) {
                    // just in case
                    console.log('Logout succeeded!');
                    $rootScope.authenticated = false;
                    $rootScope.account = null;
                };
            })($rootScope, $state);

            var signOutFailCallback = (function($rootScope, $state) {
                return function(err) {

                    // Spring returns 404 when logout succeeded
                    if (err.status === 404) {
                        console.log('Logout succeeded!');
                        $rootScope.authenticated = false;
                        $rootScope.account = null;
                        $state.go('home');
                        return;
                    }

                    console.log('Logout failed!' + JSON.stringify(err, null, 2));
                };
            })($rootScope, $state);

            authService.signOut(signOutSuccessCallback, signOutFailCallback);
        }

        function collapse() {
            vm.isCollapsed = true;
        }

        /* Check authentication status */
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