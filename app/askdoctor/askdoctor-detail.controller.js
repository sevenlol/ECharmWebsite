(function() {
    'use strict';

    angular.module('app.askdoctor')
           .controller('askdoctorDetailController', askdoctorDetailController);

    askdoctorDetailController.$inject = [
        'question',
        'answer',
        'doctor',
        'user',
        'commentList',
        'commentUserList',
        'ratingList',
        'avgRating',
        'askdoctorCategoryList'
    ];

    function askdoctorDetailController(question, answer, doctor, user, commentList, commentUserList, ratingList, avgRating, askdoctorCategoryList) {
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

        vm.answerThisQuestion = answerThisQuestion;
        vm.commentThisQuestion = commentThisQuestion;
        vm.rateThisQuestion = rateThisQuestion;

        /* public functions */

        function answerThisQuestion() {
            // body...
        }

        function commentThisQuestion() {

        }

        function rateThisQuestion() {
            // body...
        }

        /* private functions */
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
