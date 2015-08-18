(function() {
    'use strict';

    angular.module('app.account')
           .controller('accountMeDoctorDetailController', accountMeDoctorDetailController);

    accountMeDoctorDetailController.$inject = [
        'doctor'
    ];

    function accountMeDoctorDetailController(doctor) {
        var MALE_STRING = 'MALE';
        var FEMALE_STRING = 'FEMALE';
        var ARBITRARY_GENDER_STRING = 'ARBITRARY';

        var vm = this;

        vm.GENDER_STRING = {
            MALE : MALE_STRING,
            FEMALE : FEMALE_STRING,
            ARBITRARY : ARBITRARY_GENDER_STRING
        };

        vm.doctor = doctor;
    }

})();