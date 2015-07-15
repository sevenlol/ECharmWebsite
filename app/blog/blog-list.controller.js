(function() {
    'use strict';

    angular.module('app.blog')
           .controller('blogListController', blogListController);

    blogListController.$inject = [
        'articleList',
        'doctorList'
    ];

    function blogListController(articleList, doctorList) {
        var NUM_OF_ARTICLES_IN_ROW = 5;

        var vm = this;

        vm.articleGrid = []; // This object is used to store the article objects to be displayed in ng-repeat

        // TODO fix this
        vm.articleList = articleList;
        //vm.category = $stateParams ? $stateParams.category : 'all';
        genArticleGrid(vm, articleList);
        console.log("Total: " + vm.numOfArticles + ", Row: " + vm.articleGrid[0]);
        // To do generate grid object here
        // articleGrid = [[article_1, article_2, article_3...],[],[],...]
        
        function genArticleGrid(vmObj, list) {

            var resultArr = [];

            if (list && angular.isArray(list) && list.length > 0) {
                vmObj.numOfArticles = list.length;

                var articleRow = [];
                for (var i in list) {
                    articleRow.push(list[i]);

                    if (i % NUM_OF_ARTICLES_IN_ROW === NUM_OF_ARTICLES_IN_ROW - 1) {
                        vm.articleGrid.push(articleRow);
                        articleRow = [];
                    }
                }

                if (articleRow.length > 0) {
                    vm.articleGrid.push(articleRow);
                }
            }
        }
    }
})();
