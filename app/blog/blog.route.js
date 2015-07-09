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
            templateUrl : 'app/blog/blog-home.html',
            controller : 'blogHomeController',
            controllerAs : 'vm'
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

        function resolveArticleList($stateParams, blogArticleService) {
            if (!$stateParams || !$stateParams.category || !blogArticleService) {
                return null;
            }

            // TODO verify category
            var category = $stateParams.category;

            var failCallback = function(error) {
                return null;
            };

            // read all articles
            // FIXME move 'all' to value file
            if (category === 'all') {
                try {
                    return blogArticleService
                               .readAllArticle()
                               .catch(failCallback);
                } catch(error) {
                    return null;
                }
            }

            // read article in category
            try {
                return blogArticleService
                           .readArticleInCategory(category)
                           .catch(failCallback);
            } catch(error) {
                return null;
            }

            return null;
        }

        function resolveDoctorList(articleList, memberDoctorService) {
            if (!articleList || !memberDoctorService || !angular.isArray(articleList)) {
                return null;
            }

            if (articleList.length === 0) {
                return null;
            }

            var idList = [];
            for (var i in articleList) {
                if (!articleList[i] || !angular.isString(articleList[i].author_id) ||
                    !articleList[i].author_id) {
                    continue;
                }

                idList.push(articleList[i].author_id);
            }

            var failCallback = function(error) {
                return null;
            };

            // read doctors
            try {
                return memberDoctorService
                           .readAllDoctors(idList)
                           .catch(failCallback);
            } catch(error) {
                return null;
            }

            return null;
        }

        function resolveArticle($stateParams, blogArticleService) {
            if (!$stateParams || !$stateParams.category || !blogArticleService ||
                !$stateParams.articleId) {
                return null;
            }

            var category = $stateParams.category;
            var articleId = $stateParams.articleId;
            // TODO verify category

            var failCallback = function(error) {
                return null;
            };

            // read article in category
            try {
                return blogArticleService
                           .readArticle(category, articleId)
                           .catch(failCallback);
            } catch(error) {
                return null;
            }

            return null;
        }

        function resolveAuthor(article, memberDoctorService) {
            if (!article || !memberDoctorService || !article.author_id) {
                return null;
            }

            var id = article.author_id;
            var idList = [ id ];

            var failCallback = function(error) {
                return null;
            };

            var successCallback = function(doctorList) {
                if (angular.isArray(doctorList)) {
                    return doctorList[0];
                }

                return null;
            };

            // read doctors
            try {
                return memberDoctorService
                           .readAllDoctors(idList)
                           .then(successCallback)
                           .catch(failCallback);
            } catch(error) {
                return null;
            }

            return null;
        }

        function resolveCommentList(article, blogCommentService) {
            if (!article || !blogCommentService || !article.article_id) {
                return null;
            }

            if (!article.category) {
                return null;
            }

            var category = article.category;
            var id = article.article_id;

            // TODO verify category

            var failCallback = function(error) {
                return null;
            };

            try {
                return blogCommentService
                           .readAllComment(category, id)
                           .catch(failCallback);
            } catch(error) {
                return null;
            }

            return null;
        }

        function resolveRatingList(article, blogRatingService) {
            if (!article || !blogRatingService || !article.article_id) {
                return null;
            }

            if (!article.category) {
                return null;
            }

            var category = article.category;
            var id = article.article_id;

            // TODO verify category

            var failCallback = function(error) {
                return null;
            };

            try {
                return blogRatingService
                           .readAllRating(category, id)
                           .catch(failCallback);
            } catch(error) {
                return null;
            }

            return null;
        }

        function resolveAvgRating(ratingList) {
            if (!angular.isArray(ratingList) || !ratingList.length) {
                return 0;
            }

            var total = 0;
            var count = 0;
            for (var i in ratingList) {
                var rating = ratingList[i];
                if (!angular.isNumber(rating)) {
                    continue;
                }

                // FIXME change limit to value file
                if (rating < 0 || rating > 5) {
                    continue;
                }

                total += rating;
                count++;
            }

            if (count > 0) {
                total = total / count;
            }

            return total;
        }
    }

})();
