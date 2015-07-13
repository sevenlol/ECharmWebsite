(function() {
    'use strict';

    angular.module('app.blog')
           .controller('blogListController', blogListController);

    blogListController.$inject = [
        'articleList',
        'doctorList'
    ];

    function blogListController(articleList, doctorList) {
        var vm = this;

        var articleGrid = null; // This object is used to store the article objects to be displayed in ng-repeat

        // TODO fix this
        vm.articleList = articleList;
        // To do generate grid object here
        // articleGrid = [[article_1, article_2, article_3],[],[],...]
        function genArticleGrid() {
            // TODO
        }
    }

})();
