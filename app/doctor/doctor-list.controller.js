(function() {
    'use strict';

    angular.module('app.doctor')
           .controller('doctorListController', doctorListController);

    doctorListController.$inject = [
        '$stateParams',
        'doctorCategoryList',
        'doctorList'
    ];

    function doctorListController($stateParams, doctorCategoryList, doctorList) {
        var NUM_OF_DOCTORS_IN_ROW = 4;

        var vm = this;

        vm.categoryList = doctorCategoryList;
        vm.category = $stateParams ? $stateParams.category : 'all';

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
