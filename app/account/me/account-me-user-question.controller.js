(function() {
    'use strict';

    angular.module('app.account')
           .controller('accountMeUserQuestionController', accountMeUserQuestionController);

    accountMeUserQuestionController.$inject = [
        'questionList'
    ];

    function accountMeUserQuestionController(questionList) {
        var vm = this;

        vm.questionList = questionList;
    }

})();