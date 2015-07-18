(function() {
    'use strict';

    angular.module('app.doctor')
           .controller('doctorDetailController', doctorDetailController);

    doctorDetailController.$inject = [
        '$stateParams',
        'doctorCategoryList',
        'doctor',
        'articleList',
        'qaList',
        'avgQaRating',
        'blogCategoryNameTextList'
    ];

    function doctorDetailController($stateParams, doctorCategoryList, doctor, articleList, qaList, avgQaRating, blogCategoryNameTextList) {
        var SHOW_MORE_ARTICLE_STEP = 1;
        var SHOW_MORE_QUESTION_STEP = 1;
        var MALE_STRING = 'MALE';
        var FEMALE_STRING = 'FEMALE';
        var DEFAULT_RATING_MAX = 5;
        var DEFAULT_ARTICLE_TITLE_LENGTH = 25;
        var DEFAULT_QUESTION_CONTENT_MAXLENGTH = 25;
        var DEFAULT_ANSWER_CONTENT_MAXLENGTH = 25;

        var vm = this;

        vm.GENDER_STRING = {
            MALE : MALE_STRING,
            FEMALE : FEMALE_STRING
        };

        vm.categoryList = doctorCategoryList;
        vm.category = $stateParams ? $stateParams.category : 'all';
        vm.categoryName = '';
        if  (vm.categoryList && angular.isArray(vm.categoryList) && vm.categoryList.length > 0) {
            for (var i in vm.categoryList) {
                if (vm.categoryList[i].name === vm.category) {
                    vm.categoryName = vm.categoryList[i].text;
                    break;
                }
            }
        }

        vm.doctor = doctor;
        vm.articleList = articleList;
        vm.questionList = qaList;
        vm.avgQaRating = avgQaRating;
        vm.ratingMax = DEFAULT_RATING_MAX;

        /* article variable/function */
        vm.numOfArticles = 0;
        vm.articlePageLimit = 1;
        vm.articleIndex = 0;
        vm.articleTitleLengthMax = DEFAULT_ARTICLE_TITLE_LENGTH;
        vm.displayShowMoreArticleButton = false;
        vm.showMoreArticle  = showMoreArticle;
        if (articleList && angular.isArray(articleList) && articleList.length > 0) {
            vm.numOfArticles = articleList.length;
            vm.displayShowMoreArticleButton = vm.numOfArticles > vm.articlePageLimit ? true : false;
        }

        matchArticleCategoryName(vm.articleList, blogCategoryNameTextList);

        /* question variable/function */
        vm.numOfQuestions = 0;
        vm.questionList = qaList;
        vm.questionPageLimit = 1;
        vm.questionIndex = 0;
        vm.questionLengthMax = DEFAULT_QUESTION_CONTENT_MAXLENGTH;
        vm.answerLengthMax = DEFAULT_ANSWER_CONTENT_MAXLENGTH;
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

        /* private functions */
        function matchArticleCategoryName(articleList, categoryList) {
            if (!articleList || !angular.isArray(articleList) || articleList.length === 0) {
                return;
            }

            if (!categoryList || !angular.isArray(categoryList) || categoryList.length === 0) {
                return;
            }

            for (var i in articleList) {
                if (!articleList[i] || !articleList[i].category) {
                    continue;
                }

                for (var j in categoryList) {
                    if (!categoryList[j]) {
                        continue;
                    }

                    if (articleList[i].category === categoryList[j].name) {
                        articleList[i].categoryName = categoryList[j].text;
                        break;
                    }
                }
            }
        }
    }

})();
