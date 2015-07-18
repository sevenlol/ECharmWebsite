(function() {
    'use strict';

    angular.module('app.blog')
           .controller('blogDetailCommentController', blogDetailCommentController);

    blogDetailCommentController.$inject = [
        '$stateParams',
        'article',
        'blogCommentService'
    ];

    function blogDetailCommentController($stateParams, article, blogCommentService) {
        var vm = this;
        var COMMNET_MIN_LENGTH = 10;

        vm.commentThisArticle = commentThisArticle;
        vm.category = $stateParams ? $stateParams.category : 'all';
        vm.articleId = $stateParams.articleId;
        vm.commentMessage = "";
        vm.commentContent = "";
        /* public functions */
        function commentThisArticle() {
            // body...
            // 1. Check if the length of the comment is greater than the specified length
            // 2. If yes, post the comment. If not, show an alert window and do nothing
            //console.log("Comment: " + vm.commentContent.length + " " + $stateParams.category + " " + $stateParams.articleId);
            if(COMMNET_MIN_LENGTH > vm.commentContent.length) {
                vm.commentMessage = "The comment length must be at least 10 characters!!!!";
            }
            else {
                vm.commentMessage = "";
                // Create comment object here
                try {
                    //blogCommentService.createComment(vm.category, vm.articleId, vm.commentContent).catch(failCallback);
                } catch(error) {
                    vm.commentMessage = error;
                }
                
            }
        }
    }

})();
