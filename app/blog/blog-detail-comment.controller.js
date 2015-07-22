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

        // comment form
        vm.min = 10;
        vm.commentSubmitted = false;
        vm.commentStatusMessage = {
            isShown : false,
            type    : 'error',
            message : ''
        };

        vm.commentThisArticle = commentThisArticle;
        vm.category = $stateParams ? $stateParams.category : 'all';
        vm.articleId = $stateParams.articleId;
        vm.commentMessage = "";
        vm.commentText = "";
        vm.commentSucc = false;
        vm.myAccount = myAccount;
        vm.commentThisArticle = commentThisArticle;
        /* public functions */
        /*
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
        */
        function commentThisArticle() {
            vm.commentSubmitted = true;
            vm.commentStatusMessage.isShown = false;

            // invalid comment text
            if (vm.commentForm.commentText.$invalid) {
                return;
            }

            if (!blogCommentService || !myAccount || !myAccount.account_id) {
                submitCommentFailed('發表評論時發生錯誤，請稍後重新嘗試');
                return;
            }

            var commentBody = {
                commenter_id : myAccount.account_id,
                created_at : $filter('date')(new Date(), DATE_FORMAT),
                updated_at : $filter('date')(new Date(), DATE_FORMAT),
                comment_text : vm.commentText,
                author_response_text: "asd",
                responded_at: $filter('date')(new Date(), DATE_FORMAT)
            };

            // callbacks
            var submitCommentSuccessCallback = function(comment) {
                // TODO add handling code
                // create failed
                if (!comment) {
                    submitCommentFailed('發表評論時發生錯誤，請稍後重新嘗試');
                    return;
                }

                submitCommentSucceeded('評論發表成功', comment);
                // created succeeded
            }
            var submitCommentFailCallback = function(error) {
                if (error && error.message) {
                    submitCommentFailed(error.message);
                    return;
                }

                submitCommentFailed('發表評論時發生錯誤，請稍後重新嘗試');
            };

            try {
                blogCommentService
                    .createComment(vm.category, vm.articleId, commentBody)
                    .then(submitCommentSuccessCallback)
                    .catch(submitCommentFailCallback);
            } catch (e) {
                submitCommentFailed('發表評論時發生錯誤，請稍後重新嘗試');
            }
        }

        function submitCommentFailed(msg) {
            vm.commentSubmitted = false;
            vm.commentStatusMessage.isShown = true;
            vm.commentStatusMessage.type = 'error';
            vm.commentStatusMessage.message = msg;
        }

        function submitCommentSucceeded(msg, comment) {
            vm.commentSubmitted = false;
            vm.commentStatusMessage.isShown = true;
            vm.commentStatusMessage.type = 'success';
            vm.commentStatusMessage.message = msg;
            vm.commentText = '';

            // add myAccount to comment
            comment.user = vm.myAccount;

            if (!vm.commentList || !angular.isArray(vm.commentList) || vm.commentList.length === 0) {
                vm.commentList = [ comment ];
            } else {
                vm.commentList.push(comment);
            }
        }
    }

})();
