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
        var SIGNIN_SUCCESS_MESSAGE = 'Sign in succeeded!';
        var SIGNIN_FAIL_MESSAGE = 'Invalid account or password!';

        var vm = this;

        // state variable: credentials
        vm.credentials = {};

        vm.signIn = signIn;
        vm.fbSignIn = fbSignIn;

        vm.hideMessage = hideMessage;

        vm.msg = {
            isShown : false,
            type : 'danger',
            text : 'text'
        };

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
                        showFailMessage(SIGNIN_FAIL_MESSAGE);
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
                    showFailMessage(SIGNIN_FAIL_MESSAGE);
                }
            })($rootScope, $state);

            authService.signIn(vm.credentials, signInSuccessCallback, signInFailCallback);
        }

        function fbSignIn() {
            authService.fbSignIn(null);
        }

        function hideMessage() {
            vm.msg.isShown = false;
        }

        /* private functions */

        function showSuccessMessage(message) {
            vm.msg.isShown = true;
            vm.msg.type = 'success';
            vm.msg.text = angular.isString(message) ? message : "";
        }

        function showFailMessage(message) {
            vm.msg.isShown = true;
            vm.msg.type = 'danger';
            vm.msg.text = angular.isString(message) ? message : "";
        }
    }

})();