(function() {
    'use strict';

    angular.module('app.askdoctor')
           .controller('askdoctorDetailCommentController', askdoctorDetailCommentController);

    askdoctorDetailCommentController.$inject = [
        'question'
    ];

    function askdoctorDetailCommentController(question) {
        var vm = this;

        vm.commentThisQuestion = commentThisQuestion;

        /* public functions */

        function commentThisQuestion() {
            // body...
        }
    }

})();
