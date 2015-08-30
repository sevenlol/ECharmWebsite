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
            resolve : {
                myAccount : resolveMyAccount
            },
            templateUrl : 'app/blog/blog.html'
        };

        var blogHomeState = {
            name : 'blog.home',
            url : '/home',
            parent : blogState,
            templateUrl : 'app/blog/blog-home.html',
            resolve : {
                allPopularBlogList : resolveAllPopularBlogList
            },
            controller : 'blogHomeController',
            controllerAs : 'vm'
        };

        var blogListState = {
            name : 'blog.list',
            parent : blogState,
            url : '/:category',
            templateUrl : 'app/blog/blog-list.html',
            resolve : {
                popularBlogList : resolvePopularBlogList,
                popularDoctorList : resolvePopularDoctorList,
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
            resolve : {
                article : resolveArticle,
                author : resolveAuthor,
                commentList : resolveCommentList,
                commentUserList : resolveCommentUserList,
                ratingList : resolveRatingList,
                avgRating : resolveAvgRating,
                myFavArticle : resolveMyFavArticle,
                authorArticleList : resolveAuthorArticleList
            },
            templateUrl : 'app/blog/blog-detail.html',
            controller : 'blogDetailController',
            controllerAs : 'vm'
        };
        /*
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
        */

        /* Blog System Routing */

        $stateProvider
            .state(blogState)
            .state(blogHomeState)
            .state(blogListState)
            .state(blogDetailState);
        //    .state(blogDetailReadState)
        //    .state(blogDetailCommentState);


        /* resolve functions */
        function resolveMyAccount(authService) {
            if (!authService) {
                return null;
            }

            /* Check authentication status */
            var successCallback = (function() {
                return function(res) {
                    return res.data;
                };
            })();
            var failCallback = (function() {
                return function(res) {
                    return null;
                };
            })();

            // check if the user is logged in
            var promise = authService.checkAuthStatus(null, null);
            return promise
                    .then(successCallback)
                    .catch(failCallback);
        }

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

        function resolveAuthorArticleList($stateParams, article, blogArticleService) {
            if (!article || !article.author_id || !blogArticleService) {
                return null;
            }

            // TODO verify category
            var category = $stateParams.category;

            console.log('Author ID: ' + article.author_id);

            var failCallback = function(error) {
                return null;
            };

            try {
                return blogArticleService
                            .readArticleByAuthorId(category, article.author_id)
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

        function resolveCommentUserList(commentList, memberUserService) {
            if (!commentList || !memberUserService || !angular.isArray(commentList)) {
                return null;
            }

            if (commentList.length === 0) {
                return null;
            }

            var idList = [];
            for (var i in commentList) {
                if (!commentList[i] || !angular.isString(commentList[i].commenter_id) ||
                    !commentList[i].commenter_id) {
                    continue;
                }

                idList.push(commentList[i].commenter_id);
            }

            var failCallback = function(error) {
                return null;
            };

            // read users
            try {
                return memberUserService
                           .readUsers(idList)
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
                if (!rating || !angular.isNumber(rating.rating_value)) {
                    continue;
                }

                // FIXME change limit to value file
                if (rating.rating_value < 0 || rating.rating_value > 5) {
                    continue;
                }

                total += rating.rating_value;
                count++;
            }

            if (count > 0) {
                total = total / count;
            }

            return total;
        }

        function resolveMyFavArticle(article, favoriteMeService) {
            if (!article || !favoriteMeService || !article.article_id) {
                return null;
            }

            var failCallback = function(error) {
                return null;
            };

            try {
                return favoriteMeService
                           .readMyFavoriteArticle(article.article_id)
                           .catch(failCallback);
            } catch(error) {
                return null;
            }
        }

        function resolveAllPopularBlogList(popularListService) {
            if (!popularListService) return null;

            var failCallback = function(error) {
                return null;
            };

            try {
                return popularListService
                            .readAllPopularArticleList()
                            .catch(failCallback);
            } catch (error) {
                return null;
            }
        }

        function resolvePopularBlogList($stateParams, popularListService) {
            if (!$stateParams || !$stateParams.category || !popularListService) {
                return null;
            }

            var category = $stateParams.category;
            var failCallback = function(error) {
                return null;
            };

            // TODO implement new API
            if (category === 'all') {
                return null;
            }

            try {
                return popularListService
                            .readPopularArticleList(category)
                            .catch(failCallback);
            } catch (error) {
                return null;
            }
        }

        function resolvePopularDoctorList($stateParams, popularListService) {
            if (!$stateParams || !$stateParams.category || !popularListService) {
                return null;
            }

            var category = $stateParams.category;
            var failCallback = function(error) {
                return null;
            };

            // TODO implement new API
            if (category === 'all') {
                return null;
            }

            try {
                return popularListService
                            .readPopularDoctorList(category)
                            .catch(failCallback);
            } catch (error) {
                return null;
            }
        }
    }

})();
