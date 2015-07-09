(function() {
    'use strict';

    angular.module('app.doctor')
           .controller('doctorListController', doctorListController);

    doctorListController.$inject = [
        'doctorList'
    ];

    function doctorListController(doctorList) {
        var NUM_OF_DOCTORS_IN_ROW = 6;

        var vm = this;
        vm.doctorList = [];
        vm.numOfDoctors = 0;

        if (doctorList && angular.isArray(doctorList) && doctorList.length > 0) {
            vm.numOfDoctors = doctorList.length;

            var doctorRow = [];
            for (var i in doctorList) {
                doctorRow.push(doctorList[i]);

                if (i % NUM_OF_DOCTORS_IN_ROW === NUM_OF_DOCTORS_IN_ROW - 1) {
                    vm.doctorList.push(doctorRow);
                    doctorRow = [];
                }
            }

            if (doctorRow.length > 0) {
                vm.doctorList.push(doctorRow);
            }
        }
    }

})();
