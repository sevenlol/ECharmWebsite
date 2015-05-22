(function() {
    'use strict';

    angular.module('app.account')
           .controller('accountMeDoctorDetailController', accountMeDoctorDetailController);

    accountMeDoctorDetailController.$inject = [
        'doctor'
    ];

    function accountMeDoctorDetailController(doctor) {
        var vm = this;

        // TODO fix this
        vm.doctorInfo = null;
    }

})();