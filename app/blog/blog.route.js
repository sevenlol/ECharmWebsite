(function() {
    'use strict';

    angular.module('app.blog')
           .config(blogConfig);

    blogConfig.$inject = [
        '$stateProvider'
    ];

    function blogConfig($stateProvider) {

        /* State Objects */

        var contentState = {
            name : 'content',
            abstract : true,
            template : '<h1>Content List</h1><div ui-view></div>'
        };

        var blogState = {
            name : 'content.blog',
            url : '^/blog',
            parent : contentState,
            abstract : true,
            template : '<h1>Category List</h1><div ui-view></div>'
        };

        var blogListState = {
            name : 'content.blog.list',
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
            name : 'content.blog.detail',
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
            templateUrl : '<h1>Article Content</h1><div ui-view></div>',
            controller : 'blogDetailController'
        };

        var blogDetailReadState = {
            name : 'content.blog.detail.read',
            parent : blogDetailState,
            template : '<button>Leave a comment!</button>'
        };

        var blogDetailCommentState = {
            name : 'content.blog.detail.comment',
            parent : blogDetailState,
            template : '<button>Submit!</button>',
            controller : 'blogDetailCommentController'
        };


        /* Blog System Routing */

        $stateProvider
            .state(contentState)
            .state(blogState)
            .state(blogListState)
            .state(blogDetailState)
            .state(blogDetailReadState)
            .state(blogDetailCommentState);


        /* resolve functions */

        function resolveArticleList() {
            // body...
        }

        function resolveDoctorList() {
            // body...
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

        function resolveAvgRating() {
            // body...
        }

        function resolveArticle() {
            // body...
        }

    }

});