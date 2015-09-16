(function() {
    'use strict';

    angular
        .module('app.blog')
        .directive('blogArticleContentDirective', blogArticleContentDirective);

    function blogArticleContentDirective() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'app/blog/blog-article-content.directive.html',
            scope: {
                article: '='
            },
            link: linkFunc,
            controller: ArticleContentController,
            controllerAs: 'vm',
            bindToController: true // because the scope is isolated
        };

        return directive;

        function linkFunc(scope, el, attr, ctrl) {
            // console.log('LINK: scope.min = %s *** should be undefined', scope.min);
            // console.log('LINK: scope.article = %s *** should be undefined', scope.article);
            // console.log('LINK: scope.vm.min = %s', scope.vm.min);
            // console.log('LINK: scope.vm.article = %s', scope.vm.article);
        }
    }

    ArticleContentController.$inject = [
        '$scope',
        'blogArticleContentService',
        'blogCategoryList'
    ];

    function ArticleContentController($scope, blogArticleContentService, blogCategoryList) {
        var DEFAULT_INTRO_ICON_URL = 'images/pediatrics.png';

        // Injecting $scope just for comparison
        var service = blogArticleContentService;

        var vm = this;

        vm.Constants = service.Constant;

        // initiate article content
        vm.articleContent = initArticleContent(vm.article, service);
        vm.introIconUrl = getIntroIconUrl(vm.article, blogCategoryList);

        /* private functions */

        function initArticleContent(article, service) {
            if (!article || !article.content_text || !angular.isString(article.content_text)) {
                return null;
            }

            if (!service || !service.parse) {
                return null;
            }

            return service.parse(article.content_text);
        }

        function getIntroIconUrl(article, catList) {
            if (!article || !catList || !article.category ||
                !angular.isArray(catList)) {
                return DEFAULT_INTRO_ICON_URL;
            }

            for (var i in catList) {
                if (catList[i].name === article.category) {
                    return catList[i].intro_icon_url ?
                           catList[i].intro_icon_url :
                           DEFAULT_INTRO_ICON_URL;
                }
            }

            return DEFAULT_INTRO_ICON_URL;
        }
    }

})();
