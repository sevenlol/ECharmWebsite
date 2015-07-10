(function() {
    'use strict';

    angular.module('app.doctor')
           .controller('doctorDetailController', doctorDetailController);

    doctorDetailController.$inject = [
        'doctor',
        'articleList',
        'answerList'
    ];

    function doctorDetailController(doctor, articleList, answerList) {
        var SHOW_MORE_ARTICLE_STEP = 1;
        var SHOW_MORE_QUESTION_STEP = 1;

        var vm = this;

        vm.doctor = doctor;
        vm.articleList = articleList;
        vm.questionList = answerList;

        /* article variable/function */
        vm.numOfArticles = 0;
        vm.articlePageLimit = 1;
        vm.articleIndex = 0;
        vm.displayShowMoreArticleButton = false;
        vm.showMoreArticle  = showMoreArticle;
        if (articleList && angular.isArray(articleList) && articleList.length > 0) {
            vm.numOfArticles = articleList.length;
            vm.displayShowMoreArticleButton = vm.numOfArticles > vm.articlePageLimit ? true : false;
        }

        /* question variable/function */
        vm.numOfQuestions = 0;
        vm.questionList = answerList;
        vm.questionPageLimit = 1;
        vm.questionIndex = 0;
        vm.displayShowMoreQuestionButton = false;
        vm.showMoreQuestion  = showMoreQuestion;

        // set number of questions
        if (vm.questionList && angular.isArray(vm.questionList)) {
            vm.numOfQuestions = vm.questionList.length;
            vm.displayShowMoreQuestionButton = vm.numOfQuestions > vm.questionPageLimit ? true : false;
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

        function showMoreArticle() {
            if (!vm.numOfArticles) {
                return;
            }

            if (vm.articleIndex + vm.articlePageLimit + SHOW_MORE_ARTICLE_STEP >= vm.numOfArticles) {
                vm.articlePageLimit = vm.numOfArticles;
                vm.displayShowMoreArticleButton = false;
            } else {
                vm.displayShowMoreArticleButton = true;
                vm.articlePageLimit += SHOW_MORE_ARTICLE_STEP;
            }
        }

        function showMoreQuestion() {
            if (!vm.numOfQuestions) {
                return;
            }

            if (vm.questionIndex + vm.questionPageLimit + SHOW_MORE_QUESTION_STEP >= vm.numOfQuestions) {
                vm.questionPageLimit = vm.numOfQuestions;
                vm.displayShowMoreQuestionButton = false;
            } else {
                vm.displayShowMoreQuestionButton = true;
                vm.questionPageLimit += SHOW_MORE_QUESTION_STEP;
            }
        }
    }

})();
