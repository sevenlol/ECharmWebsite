(function() {
    'use strict';

    angular.module('app.blog')
           .controller('blogListController', blogListController);

    blogListController.$inject = [
        '$stateParams',
        '$filter',
        'articleList',
        'doctorList',
        'blogCategoryList',
        'blogTagList'
    ];

    function blogListController($stateParams, $filter, articleList, doctorList, blogCategoryList, blogTagList) {
        var NUM_OF_ARTICLES_IN_ROW = 2;

        var vm = this;

        vm.articleGrid = []; // This object is used to store the article objects to be displayed in ng-repeat

        vm.categoryList = blogCategoryList;
        vm.blogTagList = blogTagList;
        vm.numOfArticles = 0;

        vm.category = $stateParams.category;        
        // Copy from askdoctor but unavailable
        // vm.category = $stateParams ? $stateParams.category : 'all';
        // vm.categoryName = getCategoryName(askdoctorCategoryList, vm.category);

        vm.searchText = '';
        vm.searchTag = '';
        vm.updatedSearchText = '';
        vm.updatedSearchTag = '';

        vm.search = search;

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
                // vmObj.numOfArticles = list.length;
                vm.numOfArticles = list.length;

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

        function search(searchText) {
            vm.updatedSearchText = searchText;
            // vm.updatedSearchTag = searchTag;
            vm.index = 0;
            vm.pageLimit = 1;
            // console.log(vm.updatedSearchText);
        }

        // function getCategoryName(categoryList, category) {
        //     if (!categoryList || !angular.isArray(categoryList) || categoryList === 0) {
        //         return '';
        //     }

        //     if (!category) {
        //         return '';
        //     }

        //     for (var i in categoryList) {
        //         if (!categoryList[i]) {
        //             continue;
        //         }

        //         if (categoryList[i].name === category) {
        //             return categoryList[i].text;
        //         }
        //     }

        //     return '';
        // }
    }
})();
