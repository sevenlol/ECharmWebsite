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
            template : '<h1>Content Bar</h1><h1>Category List</h1><div ui-view></div>'
        };

        var blogHomeState = {
            name : 'blog.home',
            url : '/home',
            parent : blogState,
            template : '<h1>Home</h1>'
        };

        var blogListState = {
            name : 'blog.list',
            parent : blogState,
            url : '/:category',
            template : '<h1>Article List</h1>',
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
            template : '<h1>Article Content</h1><div ui-view></div>',
            controller : 'blogDetailController',
            controllerAs : 'vm'
        };

        var blogDetailReadState = {
            name : 'blog.detail.read',
            parent : blogDetailState,
            template : '<button>Leave a comment!</button>'
        };

        var blogDetailCommentState = {
            name : 'blog.detail.comment',
            parent : blogDetailState,
            template : '<button>Submit!</button>',
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