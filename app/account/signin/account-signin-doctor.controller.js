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
                return function(data) {
                    if (!angular.isObject(data.principal.account) ||
                        !data.principal.account) {
                        $rootScope.authenticated = false;
                        $rootScope.account = null;
                        return;
                    }

                    // Check user type
                    if (data.principal.account.user_type !== 'DOCTOR') {
                        $rootScope.authenticated = false;
                        $rootScope.account = null;
                        return;
                    }

                    $rootScope.authenticated = true;
                    $rootScope.account = data.principal.account;
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
    }

})();