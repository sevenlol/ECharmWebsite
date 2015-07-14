(function() {
    'use strict';

    angular.module('app.askdoctor')
           .controller('askdoctorDetailController', askdoctorDetailController);

    askdoctorDetailController.$inject = [
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
        'askdoctorAnswerService'
    ];

    function askdoctorDetailController(myAccount, question, answer, doctor, user, commentList, commentUserList, ratingList, avgRating, askdoctorCategoryList, askdoctorAnswerService) {
        var vm = this;

        vm.question = question;
        vm.answer = answer;
        vm.doctor = doctor;
        vm.user = user;
        vm.commentList = mergeCommentList(commentList, commentUserList);
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

        vm.answerThisQuestion = answerThisQuestion;
        vm.commentThisQuestion = commentThisQuestion;
        vm.rateThisQuestion = rateThisQuestion;

        /* public functions */

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
                created_at : new Date().toString(),
                updated_at : new Date().toString(),
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

                submitAnswerSucceeded('解答發表成功');
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

        function submitAnswerSucceeded(msg) {
            vm.answerSubmitted = false;
            vm.answerStatusMessage.isShown = true;
            vm.answerStatusMessage.type = 'success';
            vm.answerStatusMessage.message = msg;
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
