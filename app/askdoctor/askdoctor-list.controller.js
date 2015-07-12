(function() {
    'use strict';

    angular.module('app.askdoctor')
           .controller('askdoctorListController', askdoctorListController);

    askdoctorListController.$inject = [
        '$stateParams',
        'askdoctorCategoryList',
        'questionList',
        'doctorList',
        'userList'
    ];

    function askdoctorListController($stateParams, askdoctorCategoryList, questionList, doctorList, userList) {
        var vm = this;

        vm.categoryList = askdoctorCategoryList;
        vm.category = $stateParams ? $stateParams.category : 'all';

        vm.isCollapsed = true;
        vm.collapse = collapse;

        // TODO add state variables for askQuestion function
        // TODO fix this
        vm.questionList = null;
        vm.askQuestion = askQuestion;

        /* public functions */

        function askQuestion() {
            // body...
        }

        function collapse() {
            vm.isCollapsed = !vm.isCollapsed;
        }
    }

})();
