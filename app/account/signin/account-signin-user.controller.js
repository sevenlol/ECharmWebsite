(function() {
    'use strict';

    angular.module('app.account')
           .controller('accountSignInUserController', accountSignInUserController);

    accountSignInUserController.$inject = [
        'authService',
        '$rootScope'
    ];

    function accountSignInUserController(authService, $rootScope) {
        var vm = this;

        // state variable: credentials
        vm.credentials = {};

        vm.signIn = signIn;
        vm.fbSignIn = fbSignIn;

        /* public functions */

        function signIn() {
            if (!vm.credentials.username || !vm.credentials.password)
                return;

            var signInSuccessCallback = (function($rootScope) {
                return function(account) {
                    if (!angular.isObject(account) ||
                        !account) {
                        $rootScope.authenticated = false;
                        $rootScope.account = null;
                        return;
                    }

                    $rootScope.authenticated = true;
                    $rootScope.account = account;
                }
            })($rootScope);

            var signInFailCallback = (function($rootScope) {
                return function(error) {
                    $rootScope.authenticated = false;
                    $rootScope.account = null;
                }
            })($rootScope);

            authService.signIn(vm.credentials, signInSuccessCallback, signInFailCallback);
        }

        function fbSignIn() {
            authService.fbSignIn(null);
        }
    }

})();