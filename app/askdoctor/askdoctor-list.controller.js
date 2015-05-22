(function() {
    'use strict';

    angular.module('app.askdoctor')
           .controller('askdoctorListController', askdoctorListController);

    askdoctorListController.$inject = [
        'questionList',
        'doctorList',
        'userList'
    ];

    function askdoctorListController(questionList, doctorList, userList) {
        var vm = this;

        // TODO add state variables for askQuestion function
        // TODO fix this
        vm.questionList = null;
        vm.askQuestion = askQuestion;

        /* public functions */

        function askQuestion() {
            // body...
        }
    }

})();
