(function() {
    'use strict';

    angular.module('app.account')
           .controller('accountMeUserFavoriteQAController', accountMeUserFavoriteQAController);

    accountMeUserFavoriteQAController.$inject = [
        'user',
        'favoriteList'
    ];

    function accountMeUserFavoriteQAController(user, favoriteList) {
        var SHOW_MORE_QA_STEP = 5;
        var DEFAULT_QUESTION_CONTENT_MAXLENGTH = 25;
        var DEFAULT_ANSWER_CONTENT_MAXLENGTH = 25;

        var vm = this;

        vm.pageLimit = 5;
        vm.index = 0;
        vm.questionLengthMax = DEFAULT_QUESTION_CONTENT_MAXLENGTH;
        vm.answerLengthMax = DEFAULT_ANSWER_CONTENT_MAXLENGTH;

        vm.qaList = favoriteList ? favoriteList.favorite_qas : null;
        vm.numberOfQAs = (vm.qaList && vm.qaList.length) ? vm.qaList.length : 0;
        vm.displayShowMoreButton = vm.numberOfQAs > vm.pageLimit ? true : false;

        vm.showMoreFavQA = showMoreFavQA;

        /* public functions */

        function showMoreFavQA() {
            if (!vm.numberOfQAs) {
                return;
            }

            if (vm.index + vm.pageLimit + SHOW_MORE_QA_STEP >= vm.numberOfQAs) {
                vm.pageLimit = vm.numberOfQAs;
                vm.displayShowMoreButton = false;
            } else {
                vm.displayShowMoreButton = true;
                vm.pageLimit += SHOW_MORE_QA_STEP;
            }
        }
    }

})();