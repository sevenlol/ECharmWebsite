(function() {
    'use strict';

    angular.module('app.account')
           .controller('accountMeDoctorArticleController', accountMeDoctorArticleController);

    accountMeDoctorArticleController.$inject = [
        'articleList',
        'myAccount'
    ];

    function accountMeDoctorArticleController(articleList, myAccount) {
        var SHOW_MORE_ARTICLE_STEP = 1;

        var vm = this;

        vm.articleList = articleList;
        vm.doctorName = myAccount.user_info.name;

        vm.numberOfArticle = 0;

        vm.pageLimit = 1;
        vm.index = 0;

        vm.displayShowMoreButton = false;
        vm.showMoreArticle  = showMoreArticle;

        if (articleList && angular.isArray(articleList) && articleList.length > 0) {
            vm.numberOfArticle = articleList.length;
            vm.displayShowMoreButton = vm.numberOfArticle > vm.pageLimit ? true : false;
        }

        /* public functions */

        function showMoreArticle() {
            if (!vm.numberOfArticle) {
                return;
            }

            if (vm.index + vm.pageLimit + SHOW_MORE_ARTICLE_STEP >= vm.numberOfArticle) {
                vm.pageLimit = vm.numberOfArticle;
                vm.displayShowMoreButton = false;
            } else {
                vm.displayShowMoreButton = true;
                vm.pageLimit += SHOW_MORE_ARTICLE_STEP;
            }
        }
    }

})();