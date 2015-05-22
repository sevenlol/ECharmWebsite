(function() {
    'use strict';

    angular.module('app.account')
           .controller('accountMeDoctorEditController', accountMeDoctorEditController);

    accountMeDoctorEditController.$inject = [
        'doctor'
    ];

    function accountMeDoctorEditController(doctor) {
        var vm = this;

        // TODO fix this
        vm.doctorInfo = null;
        vm.updateMyInfo = updateMyInfo;

        /* public functions */

        function updateMyInfo() {
            // body...
        }
    }

})();