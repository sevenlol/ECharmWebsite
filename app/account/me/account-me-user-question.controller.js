(function() {
    'use strict';

    angular.module('app.account')
           .controller('accountMeUserQuestionController', accountMeUserQuestionController);

    accountMeUserQuestionController.$inject = [
        'questionList'
    ];

    function accountMeUserQuestionController(questionList) {
        var SHOW_MORE_QUESTION_STEP = 1;

        var vm = this;

        vm.numOfQuestions = 0;
        vm.questionList = questionList;

        vm.pageLimit = 1;
        vm.index = 0;

        vm.displayShowMoreButton = false;
        vm.showMoreQuestion  = showMoreQuestion;

        // set number of questions
        if (vm.questionList && angular.isArray(vm.questionList)) {
            vm.numOfQuestions = vm.questionList.length;
            vm.displayShowMoreButton = vm.numOfQuestions > vm.pageLimit ? true : false;
        }

        if (vm.numOfQuestions > 0) {
            // check if answered
            for (var i in vm.questionList) {
                if (vm.questionList[i].answer) {
                    vm.questionList[i].isAnswered = true;
                } else {
                    vm.questionList[i].isAnswered = false;
                }
            }
        }

        /* public functions */

        function showMoreQuestion() {
            if (!vm.numOfQuestions) {
                return;
            }

            if (vm.index + vm.pageLimit + SHOW_MORE_QUESTION_STEP >= vm.numOfQuestions) {
                vm.pageLimit = vm.numOfQuestions;
                vm.displayShowMoreButton = false;
            } else {
                vm.displayShowMoreButton = true;
                vm.pageLimit += SHOW_MORE_QUESTION_STEP;
            }
        }
    }

})();