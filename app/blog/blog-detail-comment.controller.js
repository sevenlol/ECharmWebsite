(function() {
    'use strict';

    angular.module('app.blog')
           .controller('blogDetailCommentController', blogDetailCommentController);

    blogDetailCommentController.$inject = [
        '$stateParams',
        '$filter',
        '$rootScope',
        'myAccount',
        'article',
        'blogCommentService'
    ];

    function blogDetailCommentController($stateParams, $filter, $rootScope, myAccount, article, blogCommentService) {
        var vm = this;
        var COMMNET_MIN_LENGTH = 10;
        var DATE_FORMAT = 'yyyy-MM-ddTHH:mmZ';

        vm.commentThisArticle = commentThisArticle;
        vm.category = $stateParams ? $stateParams.category : 'all';
        vm.articleId = $stateParams.articleId;
        vm.commentMessage = "";
        vm.commentContent = "";
        vm.commentSucc = false;
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

                // Create comment object here
                var commentObj =  {
                    commenter_id: myAccount.account_id,
                    article_id: vm.articleId,
                    category: vm.category,
                    comment_text: vm.commentContent,
                    created_at : $filter('date')(new Date(), DATE_FORMAT),
                    updated_at : $filter('date')(new Date(), DATE_FORMAT),
                    author_response_text: "asd",
                    responded_at: $filter('date')(new Date(), DATE_FORMAT)
                };
                vm.commentMessage = "Comment is successfully created";
                vm.commentContent = "";
                vm.commentSucc = true;
                try {
                    blogCommentService.createComment(vm.category, vm.articleId, commentObj);
                } catch(error) {
                    vm.commentMessage = error;
                    vm.commentSucc = false;
                }
                
            }
        }
    }

})();
