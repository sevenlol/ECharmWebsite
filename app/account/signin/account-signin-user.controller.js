(function() {
    'use strict';

    angular.module('app.account')
           .controller('accountSignInUserController', accountSignInUserController);

    accountSignInUserController.$inject = [
    ];

    function accountSignInUserController() {
        var vm = this;

        // state variable: credentials
        vm.signIn = signIn;
        vm.fbSignIn = fbSignIn;

        /* public functions */

        function signIn() {
            // body...
        }

        function fbSignIn() {
            // body...
        }
    }

})();