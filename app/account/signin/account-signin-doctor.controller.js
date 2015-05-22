(function() {
    'use strict';

    angular.module('app.account')
           .controller('accountSignInDoctorController', accountSignInDoctorController);

    accountSignInDoctorController.$inject = [
    ];

    function accountSignInDoctorController() {
        var vm = this;

        // state variable: credentials
        vm.signIn = signIn;

        /* public functions */

        function signIn() {
            // body...
        }
    }

})();