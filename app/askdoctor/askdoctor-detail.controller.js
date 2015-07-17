(function() {
    'use strict';

    angular.module('app.askdoctor')
           .controller('askdoctorDetailController', askdoctorDetailController);

    askdoctorDetailController.$inject = [
        '$filter',
        'myAccount',
        'question',
        'answer',
        'doctor',
        'user',
        'commentList',
        'commentUserList',
        'ratingList',
        'avgRating',
        'askdoctorCategoryList',
        'askdoctorAnswerService',
        'askdoctorCommentService',
        'askdoctorRatingService'
    ];

    function askdoctorDetailController($filter, myAccount, question, answer, doctor, user, commentList, commentUserList, ratingList, avgRating,
                                                        askdoctorCategoryList, askdoctorAnswerService, askdoctorCommentService, askdoctorRatingService) {
        var DATE_FORMAT = 'yyyy-MM-ddTHH:mmZ';
        var DEFAULT_RATING_MAX = 5;

        var vm = this;

        vm.question = question;
        vm.answer = answer;
        vm.doctor = doctor;
        vm.user = user;
        vm.commentList = mergeCommentList(commentList, commentUserList);
        vm.ratingList = ratingList;
        vm.avgRating = avgRating;
        vm.category = (question && question.category) ? question.category : 'all';
        vm.categoryName = getCategoryName(askdoctorCategoryList, question);
        vm.categoryList = askdoctorCategoryList;

        // answer form
        vm.answerMin = 20;
        vm.answerSubmitted = false;
        vm.answerStatusMessage = {
            isShown : false,
            type    : 'error',
            message : ''
        };

        // comment form
        vm.min = 10;
        vm.commentSubmitted = false;
        vm.commentStatusMessage = {
            isShown : false,
            type    : 'error',
            message : ''
        };

        // rating
        vm.ratingMax = 5;
        vm.hoverOverRating = hoverOverRating;

        // my rating bar
        vm.isMyRatingBarCollapsed = true;
        vm.myRating = 0;
        vm.iAlreadyRated = findMyRating(vm.ratingList);
        vm.collapseMyRatingBar = collapseMyRatingBar;

        vm.answerThisQuestion = answerThisQuestion;
        vm.commentThisQuestion = commentThisQuestion;
        vm.rateThisQuestion = rateThisQuestion;

        /* public functions */

        function hoverOverRating(value) {
            if (vm.ratingList && vm.ratingList.length) {
                vm.overRatingValue = '平均 ' + vm.avgRating + ' 分 總共' + vm.ratingList.length + '次評分紀錄';
            } else {
                vm.overRatingValue = '目前尚無評分紀錄';
            }
        }

        function answerThisQuestion() {
            vm.answerSubmitted = true;
            vm.answerStatusMessage.isShown = false;

            // invalid answer text
            if (vm.answerForm.answerText.$invalid) {
                return;
            }

            if (!askdoctorAnswerService || !myAccount ||
                myAccount.user_type !== 'DOCTOR' || !myAccount.account_id) {
                submitAnswerFailed('發表解答時發生錯誤，請稍後重新嘗試');
            }

            // TODO change this
            var answerBody = {
                answerer_id : myAccount.account_id,
                created_at : $filter('date')(new Date(), DATE_FORMAT),
                updated_at : $filter('date')(new Date(), DATE_FORMAT),
                answer_text : vm.answerText
            };

            // callbacks
            var submitAnswerSuccessCallback = function(answer) {
                // TODO add handling code
                // create failed
                if (!answer) {
                    submitAnswerFailed('發表解答時發生錯誤，請稍後重新嘗試');
                    return;
                }

                submitAnswerSucceeded('解答發表成功', answer);
                // created succeeded
            }
            var submitAnswerFailCallback = function(error) {
                if (error && error.message) {
                    submitAnswerFailed(error.message);
                    return;
                }

                submitAnswerFailed('發表解答時發生錯誤，請稍後重新嘗試');
            };

            try {
                askdoctorAnswerService
                    .createAnswer(vm.question.category, vm.question.question_id, answerBody)
                    .then(submitAnswerSuccessCallback)
                    .catch(submitAnswerFailCallback);
            } catch (e) {
                submitAnswerFailed('發表解答時發生錯誤，請稍後重新嘗試');
            }
        }

        function commentThisQuestion() {
            vm.commentSubmitted = true;
            vm.commentStatusMessage.isShown = false;

            // invalid comment text
            if (vm.commentForm.commentText.$invalid) {
                return;
            }

            if (!askdoctorCommentService || !myAccount || !myAccount.account_id) {
                submitCommentFailed('發表評論時發生錯誤，請稍後重新嘗試');
            }

            var commentBody = {
                commenter_id : myAccount.account_id,
                created_at : $filter('date')(new Date(), DATE_FORMAT),
                updated_at : $filter('date')(new Date(), DATE_FORMAT),
                comment_text : vm.commentText
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
                askdoctorCommentService
                    .createComment(vm.question.category, vm.question.question_id, commentBody)
                    .then(submitCommentSuccessCallback)
                    .catch(submitCommentFailCallback);
            } catch (e) {
                submitAnswerFailed('發表評論時發生錯誤，請稍後重新嘗試');
            }
        }

        function rateThisQuestion() {
            // body...
        }

        /* private functions */

        function submitAnswerFailed(msg) {
            vm.answerSubmitted = false;
            vm.answerStatusMessage.isShown = true;
            vm.answerStatusMessage.type = 'error';
            vm.answerStatusMessage.message = msg;
        }

        function submitAnswerSucceeded(msg, answer) {
            vm.answerSubmitted = false;
            vm.answerStatusMessage.isShown = true;
            vm.answerStatusMessage.type = 'success';
            vm.answerStatusMessage.message = msg;

            if (!vm.answer) {
                vm.answer = answer;
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

            if (!vm.commentList || !angular.isArray(vm.commentList) || vm.commentList.length === 0) {
                vm.commentList = [ comment ];
            } else {
                vm.commentList.push(comment);
            }
        }

        function findMyRating(ratingList) {
            if (!ratingList || !angular.isArray(ratingList) ||
                ratingList.length === 0 || !myAccount || !myAccount.account_id) {
                return false;
            }

            for (var i in ratingList) {
                if (!ratingList[i]) {
                    continue;
                }

                if (ratingList[i].rater_id === myAccount.account_id) {
                    vm.iAlreadyRated = true;
                    vm.myRating = ratingList[i].rating_value;
                    return true;
                }
            }

            return false;
        }

        function collapseMyRatingBar() {
            vm.isMyRatingBarCollapsed = !vm.isMyRatingBarCollapsed;
        }

        function getCategoryName(categoryList, question) {
            if (!categoryList || !angular.isArray(categoryList) || categoryList === 0) {
                return '';
            }

            if (!question || !angular.isObject(question)) {
                return '';
            }

            for (var i in categoryList) {
                if (!categoryList[i]) {
                    continue;
                }

                if (categoryList[i].name === question.category) {
                    return categoryList[i].text;
                }
            }

            return '';
        }

        function mergeCommentList(commentList, commentUserList) {
            if (!commentList || !angular.isArray(commentList) || commentList.length === 0) {
                return null;
            }

            for (var i in commentList) {
                if (!commentList[i] || !angular.isObject(commentList[i])) {
                    continue;
                }

                if (commentUserList && angular.isArray(commentUserList) && commentUserList.length > 0) {

                    for (var j in commentUserList) {
                        if (!commentUserList[j]) {
                            continue;
                        }

                        if (commentList[i].commenter_id === commentUserList[j].account_id) {
                            commentList[i].user = commentUserList[j];
                            break;
                        }
                    }
                }
            }

            return commentList;
        }
    }

})();
