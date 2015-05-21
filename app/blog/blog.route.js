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
            controller : 'blogListController'
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
            controller : 'blogDetailController'
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
            controller : 'blogDetailCommentController'
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

        function resolveArticleList() {
            return null;
        }

        function resolveDoctorList() {
            return null;
        }

        function resolveArticle() {
            // body...
        }

        function resolveAuthor() {
            // body...
        }

        function resolveCommentList() {
            // body...
        }

        function resolveRatingList() {
            // body...
        }

        function resolveAvgRating() {
            // body...
        }

    }

})();