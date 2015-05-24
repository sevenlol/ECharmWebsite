(function() {
    'use strict';

    angular.module('app.blog')
           .config(blogConfig);

    blogConfig.$inject = [
        '$stateProvider'
    ];

    function blogConfig($stateProvider) {

        /* State Objects */

        var blogState = {
            name : 'blog',
            url : '^/blog',
            abstract : true,
            templateUrl : 'app/blog/blog.html'
        };

        var blogHomeState = {
            name : 'blog.home',
            url : '/home',
            parent : blogState,
            templateUrl : 'app/blog/blog-home.html'
        };

        var blogListState = {
            name : 'blog.list',
            parent : blogState,
            url : '/:category',
            templateUrl : 'app/blog/blog-list.html',
            resolve : {
                articleList : resolveArticleList,
                doctorList : resolveDoctorList
            },
            controller : 'blogListController',
            controllerAs : 'vm'
        };

        var blogDetailState = {
            name : 'blog.detail',
            parent : blogState,
            url : '/:category/:articleId',
            abstract : true,
            resolve : {
                article : resolveArticle,
                author : resolveAuthor,
                commentList : resolveCommentList,
                ratingList : resolveRatingList,
                avgRating : resolveAvgRating
            },
            templateUrl : 'app/blog/blog-detail.html',
            controller : 'blogDetailController',
            controllerAs : 'vm'
        };

        var blogDetailReadState = {
            name : 'blog.detail.read',
            parent : blogDetailState,
            templateUrl : 'app/blog/blog-detail-read.html'
        };

        var blogDetailCommentState = {
            name : 'blog.detail.comment',
            parent : blogDetailState,
            templateUrl : 'app/blog/blog-detail-comment.html',
            controller : 'blogDetailCommentController',
            controllerAs : 'vm'
        };


        /* Blog System Routing */

        $stateProvider
            .state(blogState)
            .state(blogHomeState)
            .state(blogListState)
            .state(blogDetailState)
            .state(blogDetailReadState)
            .state(blogDetailCommentState);


        /* resolve functions */

        function resolveArticleList($stateParams) {
            return null;
        }

        function resolveDoctorList($stateParams) {
            return null;
        }

        function resolveArticle($stateParams) {
            // body...
        }

        function resolveAuthor(article) {
            // body...
        }

        function resolveCommentList(article) {
            // body...
        }

        function resolveRatingList(article) {
            // body...
        }

        function resolveAvgRating(ratingList) {
            // body...
        }

    }

})();