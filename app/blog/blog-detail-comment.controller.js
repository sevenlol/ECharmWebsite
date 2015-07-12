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
            // 1. Check if the length of the comment is greater than the specified length
            // 2. If yes, post the comment. If not, show an alert window and do nothing
        }
    }

})();
