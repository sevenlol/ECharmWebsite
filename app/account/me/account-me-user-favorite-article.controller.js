(function() {
    'use strict';

    angular.module('app.account')
           .controller('accountMeUserFavoriteArticleController', accountMeUserFavoriteArticleController);

    accountMeUserFavoriteArticleController.$inject = [
        'user',
        'favoriteList'
    ];

    function accountMeUserFavoriteArticleController(user, favoriteList) {
        var SHOW_MORE_ARTICLE_STEP = 5;
        var DEFAULT_ARTICLE_TITLE_MAXLENGTH = 25;

        var vm = this;

        vm.pageLimit = 5;
        vm.index = 0;

        // TODO fix this
        vm.articleList = favoriteList ? favoriteList.favorite_articles : null;
    }

})();