(function() {
    'use strict';

    angular.module('app.blog')
           .controller('blogHomeController', blogHomeController);

    blogHomeController.$inject = [
    	'$stateParams',
        'allPopularBlogList',
        'blogCategoryList'
    ];

    function blogHomeController(
        $stateParams,
        allPopularBlogList,
        blogCategoryList) {

        var ARTICLE_TITLE_LIMIT = 15;

        var vm = this;

        vm.oneAccordionAtATime = true;
        vm.categoryList = blogCategoryList;
        vm.category = $stateParams ? $stateParams.category : 'all';
        vm.popularArticleList = allPopularBlogList;
        vm.articleTitleLimit = ARTICLE_TITLE_LIMIT;
    }

})();
