(function() {
    'use strict';

    angular.module('app.blog')
           .controller('blogDetailCommentController', blogDetailCommentController);

    blogDetailCommentController.$inject = [
        'article'
    ];

    function blogDetailCommentController(article) {
        var vm = this;

        vm.commentThisArticle = commentThisArticle;

        /* public functions */
        function commentThisArticle() {
            // body...
        }
    }

})();
