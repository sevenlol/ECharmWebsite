(function() {
    'use strict';

    angular.module('app.askdoctor')
           .controller('askdoctorDetailController', askdoctorDetailController);

    askdoctorDetailController.$inject = [
        'question',
        'doctor',
        'user',
        'commentList',
        'ratingList',
        'avgRating'
    ];

    function askdoctorDetailController(question, doctor, user, commentList, ratingList, avgRating) {
        var vm = this;

        vm.question = question;
        vm.doctor = doctor;
        vm.user = user;
        vm.commentList = commentList;
        vm.avgRating = avgRating;

        vm.answerThisQuestion = answerThisQuestion;

        /* public functions */

        function answerThisQuestion() {
            // body...
        }
    }

})();
