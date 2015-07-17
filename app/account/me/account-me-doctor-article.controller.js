(function() {
    'use strict';

    angular.module('app.account')
           .controller('accountMeDoctorArticleController', accountMeDoctorArticleController);

    accountMeDoctorArticleController.$inject = [
        'articleList',
        'myAccount',
        'blogCategoryNameTextList'
    ];

    function accountMeDoctorArticleController(articleList, myAccount, blogCategoryNameTextList) {
        var SHOW_MORE_ARTICLE_STEP = 1;
        var DEFAULT_ARTICLE_TITLE_LENGTH = 25;

        var vm = this;

        vm.articleList = articleList;
        vm.doctorName = myAccount.user_info.name;

        vm.numberOfArticle = 0;

        vm.pageLimit = 1;
        vm.index = 0;
        vm.articleTitleLengthMax = DEFAULT_ARTICLE_TITLE_LENGTH;

        vm.displayShowMoreButton = false;
        vm.showMoreArticle  = showMoreArticle;

        if (articleList && angular.isArray(articleList) && articleList.length > 0) {
            vm.numberOfArticle = articleList.length;
            vm.displayShowMoreButton = vm.numberOfArticle > vm.pageLimit ? true : false;
        }

        matchArticleCategoryName(vm.articleList, blogCategoryNameTextList);

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