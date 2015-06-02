(function() {
    'use strict';

    angular.module('app.account')
           .controller('accountSignInDoctorController', accountSignInDoctorController);

    accountSignInDoctorController.$inject = [
        'authService',
        '$rootScope'
    ];

    function accountSignInDoctorController(authService, $rootScope) {
        var vm = this;

        // state variable: credentials
        vm.credentials = {};

        vm.signIn = signIn;

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
                        $rootScope.credentials = null;
                        return;
                    }

                    // Check user type
                    if (account.user_type !== 'DOCTOR') {
                        $rootScope.authenticated = false;
                        $rootScope.account = null;
                        $rootScope.credentials = null;
                        return;
                    }

                    $rootScope.authenticated = true;
                    $rootScope.account = account;
                    $rootScope.credentials = vm.credentials;
                }
            })($rootScope);

            var signInFailCallback = (function($rootScope) {
                return function(error) {
                    $rootScope.authenticated = false;
                    $rootScope.account = null;
                    $rootScope.credentials = null;
                }
            })($rootScope);

            authService.signIn(vm.credentials, signInSuccessCallback, signInFailCallback);
        }
    }

})();