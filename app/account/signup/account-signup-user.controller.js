(function() {
    'use strict';

    angular.module('app.account')
           .controller('accountSignUpUserController', accountSignUpUserController);

    accountSignUpUserController.$inject = [
    ];

    function accountSignUpUserController() {
        var vm = this;

        // state variable: userInfo
        vm.signUp = signUp;

        /* public functions */
        function signUp() {
            // body...
        }
    }

})();