(function() {
    'use strict';

    angular.module('app.doctor')
           .controller('doctorListController', doctorListController);

    doctorListController.$inject = [
        '$stateParams',
        '$filter',
        'doctorCategoryList',
        'doctorList'
    ];

    function doctorListController($stateParams, $filter, doctorCategoryList, doctorList) {
        var NUM_OF_DOCTORS_IN_ROW = 4;

        var vm = this;

        vm.categoryList = doctorCategoryList;
        vm.category = $stateParams ? $stateParams.category : 'all';

        vm.doctorList = doctorList;
        vm.filteredDoctorList = doctorList;
        vm.doctorGrid = [];
        vm.numOfDoctors = 0;

        vm.searchText = '';
        vm.updatedSearchText = '';
        vm.search = search;

        matchCategoryName(vm.doctorList, doctorCategoryList);
        generateDoctorGrid(doctorList);

        /* public functions */
        function search(searchText) {
            vm.updatedSearchText = searchText;
            vm.searchText = '';

            vm.filteredDoctorList = $filter('filter')(doctorList, vm.updatedSearchText);
            generateDoctorGrid(vm.filteredDoctorList);
        }

        /* private functions */

        function generateDoctorGrid(doctorList) {
            vm.doctorGrid = [];
            if (doctorList && angular.isArray(doctorList) && doctorList.length > 0) {
                vm.numOfDoctors = doctorList.length;

                var doctorRow = [];
                for (var i in doctorList) {
                    doctorRow.push(doctorList[i]);

                    if (i % NUM_OF_DOCTORS_IN_ROW === NUM_OF_DOCTORS_IN_ROW - 1) {
                        vm.doctorGrid.push(doctorRow);
                        doctorRow = [];
                    }
                }

                if (doctorRow.length > 0) {
                    vm.doctorGrid.push(doctorRow);
                }
            }
        }

        function matchCategoryName(doctorList, doctorCategoryList) {
            if (!doctorList || !angular.isArray(doctorList) || doctorList.length === 0) {
                return;
            }

            if (!doctorCategoryList || !angular.isArray(doctorCategoryList) || doctorCategoryList.length === 0) {
                return;
            }

            for (var i in doctorList) {
                if (!doctorList[i]) {
                    continue;
                }

                var doctor = doctorList[i];
                for (var j in doctorCategoryList) {
                    if (!doctorCategoryList[j]) {
                        continue;
                    }

                    if (doctor && doctor.user_info && doctor.user_info.category === doctorCategoryList[j].name) {
                        doctor.categoryName = doctorCategoryList[j].text;
                        break;
                    }
                }
            }
        }
    }

})();
