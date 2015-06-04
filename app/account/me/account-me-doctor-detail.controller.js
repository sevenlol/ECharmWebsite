(function() {
    'use strict';

    angular.module('app.account')
           .controller('accountMeDoctorDetailController', accountMeDoctorDetailController);

    accountMeDoctorDetailController.$inject = [
        'doctor'
    ];

    function accountMeDoctorDetailController(doctor) {
        var vm = this;

        vm.doctor = doctor;
    }

})();