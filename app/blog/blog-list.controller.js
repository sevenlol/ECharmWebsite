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
        'blogTagList',
        'popularBlogList',
        'popularDoctorList',
        'blogSortOptionList'
    ];

    function blogListController($stateParams, $filter, articleList, doctorList, blogCategoryList, blogTagList, popularBlogList, popularDoctorList, blogSortOptionList) {
        var NUM_OF_ARTICLES_IN_ROW = 2;
        var SHOW_MORE_ARTICLE_STEP = 6;
        var POPULAR_BLOG_CONTENT_LENGTH_LIMIT = 20;
        var POPULAR_LIST_LIMIT = {
            BLOG : 6,
            DOCTOR : 6
        };

        var vm = this;
        vm.count = 0;

        vm.articleGrid = []; // This object is used to store the article objects to be displayed in ng-repeat

        vm.categoryList = blogCategoryList;
        vm.blogTagList = blogTagList;
        vm.pageLimit = 6;
        vm.index = 0;
        vm.numOfArticles = countNumberOfArticles(vm.ArticleList);
        // vm.sortingIn = '-created_at';
        vm.viewclass = 'module';
        vm.maxShowTag = 3;

        vm.sortOptionList = blogSortOptionList;
        vm.currentSortOption = blogSortOptionList ? blogSortOptionList[0].name : '-rating';


        vm.category = $stateParams.category;        
        // Copy from askdoctor but unavailable
        // vm.category = $stateParams ? $stateParams.category : 'all';
        vm.categoryName = getCategoryName(blogCategoryList, vm.category);

        vm.searchText = '';
        vm.searchTag = '';
        vm.updatedSearchText = '';
        vm.updatedSearchTag = '';
        // vm.orderIn = 'created_at';

        vm.popularBlogList = parsePopularBlogList(popularBlogList);
        vm.popularBlogContentMaxLength = POPULAR_BLOG_CONTENT_LENGTH_LIMIT;
        vm.popularDoctorList = parsePopularDoctorList(popularDoctorList);


        // function
        vm.search = search;
        vm.showMoreArticle = showMoreArticle;
        // vm.order = order;

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
            resetPageParameters();
            // console.log(vm.updatedSearchText);
        }


        function getCategoryName(categoryList, category) {
            if (!categoryList || !angular.isArray(categoryList) || categoryList === 0) {
                return '';
            }

            if (!category) {
                return '';
            }

            for (var i in categoryList) {
                if (!categoryList[i]) {
                    continue;
                }

                if (categoryList[i].name === category) {
                    return categoryList[i].text;
                }
            }

            return '';
        }


        // function order(orderIn) {
        // vm.orderIn = orderIn;
        // };

        function showMoreArticle() {
            if (!vm.numOfArticles) {
                return;
            }

            if (vm.index + vm.pageLimit + SHOW_MORE_ARTICLE_STEP >= vm.numOfArticles) {
                vm.pageLimit = vm.numOfArticles;
            } else {
                vm.pageLimit += SHOW_MORE_ARTICLE_STEP;
            }
        }

        function countNumberOfArticles(articleList) {
            if (!articleList || !angular.isArray(articleList)) {
                return 0;
            }

            return articleList.length;
        }

        function resetPageParameters(){
            vm.index = 0;
            vm.pageLimit = 6;
            if (vm.articleList && angular.isArray(vm.articleList) && vm.articleList.length > 0) {
                for (var i in vm.articleList) {
                    if (vm.articleList[i]) {
                        vm.articleList[i].isExpanded = false;
                    }
                }
            }
        }

        function parsePopularBlogList(blogList) {
            if (!blogList || !angular.isArray(blogList) || blogList.length === 0) {
                return null;
            }

            var row1List = [];
            var row2List = [];
            var parsedBlogList = [ row1List, row2List ];
            var count = 0;

            for (var i in blogList) {
                if (!blogList[i]) continue;
                row1List.push(blogList[i]);
                /*
                if (i % 2 === 0) {
                    row1List.push(blogList[i]);
                } else {
                    row2List.push(blogList[i]);
                }
                */
                count++;

                if (count >= POPULAR_LIST_LIMIT.BLOG) break;
            }
            return parsedBlogList;
        }

        function parsePopularDoctorList(doctorList) {
            if (!doctorList || !angular.isArray(doctorList) || doctorList.length === 0) {
                return null;
            }

            var count = 0;
            var parsedDoctorList = [];
            for (var i in doctorList) {
                if (!doctorList[i]) continue;

                parsedDoctorList.push(doctorList[i]);
                count++;

                if (count >= POPULAR_LIST_LIMIT.DOCTOR) break;
            }
            return parsedDoctorList;
        }




    }
})();
