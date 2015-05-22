(function() {
    'use strict';

    angular.module('app.account')
           .controller('accountSignUpDoctorController', accountSignUpDoctorController);

    accountSignUpDoctorController.$inject = [
    ];

    function accountSignUpDoctorController() {
        var vm = this;

        // state variable: doctorInfo
        vm.signUp = signUp;

        /* public functions */
        function signUp() {
            // body...
        }
    }

})();