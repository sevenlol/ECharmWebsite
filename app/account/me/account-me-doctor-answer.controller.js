(function() {
    'use strict';

    angular.module('app.account')
           .controller('accountMeDoctorAnswerController', accountMeDoctorAnswerController);

    accountMeDoctorAnswerController.$inject = [
        'answerList'
    ];

    function accountMeDoctorAnswerController(answerList) {
        var vm = this;
        vm.answerList = answerList;
    }

})();