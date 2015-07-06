(function() {
    'use strict';

    angular.module('app.account')
           .controller('accountSignInUserController', accountSignInUserController);

    accountSignInUserController.$inject = [
        'authService',
        '$rootScope',
        '$state'
    ];

    function accountSignInUserController(authService, $rootScope, $state) {
        var vm = this;

        // state variable: credentials
        vm.credentials = {};

        vm.signIn = signIn;
        vm.fbSignIn = fbSignIn;

        /* public functions */

        function signIn() {
            if (!vm.credentials.username || !vm.credentials.password)
                return;

            var signInSuccessCallback = (function($rootScope, $state) {
                return function(account) {
                    if (!angular.isObject(account) ||
                        !account) {
                        $rootScope.authenticated = false;
                        $rootScope.account = null;
                        $rootScope.credentials = null;
                        return;
                    }

                    $rootScope.authenticated = true;
                    $rootScope.account = account;
                    $rootScope.credentials = vm.credentials;
                    $state.go('home');
                }
            })($rootScope, $state);

            var signInFailCallback = (function($rootScope, $state) {
                return function(error) {
                    $rootScope.authenticated = false;
                    $rootScope.account = null;
                    $rootScope.credentials = null;
                }
            })($rootScope, $state);

            authService.signIn(vm.credentials, signInSuccessCallback, signInFailCallback);
        }

        function fbSignIn() {
            authService.fbSignIn(null);
        }
    }

})();