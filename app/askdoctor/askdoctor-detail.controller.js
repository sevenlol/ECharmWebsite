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
        'ratingList',
        'avgRating',
        'askdoctorCategoryList'
    ];

    function askdoctorDetailController(question, answer, doctor, user, commentList, ratingList, avgRating, askdoctorCategoryList) {
        var vm = this;

        vm.question = question;
        vm.answer = answer;
        vm.doctor = doctor;
        vm.user = user;
        vm.commentList = commentList;
        vm.avgRating = avgRating;
        vm.categoryName = getCategoryName(askdoctorCategoryList, question);

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
    }

})();
