(function() {
    'use strict';

    angular.module('app.account')
           .controller('accountMeDoctorAnswerController', accountMeDoctorAnswerController);

    accountMeDoctorAnswerController.$inject = [
        'answerList'
    ];

    function accountMeDoctorAnswerController(answerList) {
        var SHOW_MORE_QUESTION_STEP = 5;
        var DEFAULT_QUESTION_CONTENT_MAXLENGTH = 25;
        var DEFAULT_ANSWER_CONTENT_MAXLENGTH = 25;

        var vm = this;

        vm.numOfQuestions = 0;
        vm.questionList = answerList;

        vm.pageLimit = 5;
        vm.index = 0;
        vm.questionLengthMax = DEFAULT_QUESTION_CONTENT_MAXLENGTH;
        vm.answerLengthMax = DEFAULT_ANSWER_CONTENT_MAXLENGTH;

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