(function() {
    'use strict';

    angular.module('app.account')
           .controller('accountMeUserFavoriteArticleController', accountMeUserFavoriteArticleController);

    accountMeUserFavoriteArticleController.$inject = [
        'user',
        'favoriteList',
        'blogCategoryNameTextList'
    ];

    function accountMeUserFavoriteArticleController(
        user,
        favoriteList,
        blogCategoryNameTextList) {

        var SHOW_MORE_ARTICLE_STEP = 5;
        var DEFAULT_ARTICLE_TITLE_MAXLENGTH = 25;

        var vm = this;

        vm.pageLimit = 5;
        vm.index = 0;
        vm.articleLengthMax = DEFAULT_ARTICLE_TITLE_MAXLENGTH;

        vm.articleList = favoriteList ? favoriteList.favorite_articles : null;
        vm.numberOfArticles = (vm.articleList && vm.articleList.length) ? vm.articleList.length : 0;
        vm.displayShowMoreButton = vm.numberOfArticles > vm.pageLimit ? true : false;

        setArticleCategoryName(vm.articleList, blogCategoryNameTextList);

        /* public functions */

        function showMoreFavArticle() {
            if (!vm.numberOfArticles) {
                return;
            }

            if (vm.index + vm.pageLimit + SHOW_MORE_ARTICLE_STEP >= vm.numberOfArticles) {
                vm.pageLimit = vm.numberOfArticles;
                vm.displayShowMoreButton = false;
            } else {
                vm.displayShowMoreButton = true;
                vm.pageLimit += SHOW_MORE_ARTICLE_STEP;
            }
        }

        function setArticleCategoryName(articleList, categoryList) {
            if (!articleList || !categoryList) return;

            for (var i in articleList) {
                if (!articleList[i] || !articleList[i].article_category) {
                    continue;
                }

                for (var j in categoryList) {
                    if (categoryList[j].name === articleList[i].article_category) {
                        articleList[i].categoryName = categoryList[j].text;
                        break;
                    }
                }
            }
        }
    }

})();
