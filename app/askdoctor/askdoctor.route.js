(function() {
    'use strict';

    angular.module('app.askdoctor')
           .config(askdoctorConfig);

    askdoctorConfig.$inject = [
        '$stateProvider'
    ];

    function askdoctorConfig($stateProvider) {

        /* State Objects */

        var askdoctorState = {
            name : 'askdoctor',
            url : '^/askdoctor',
            abstract : true,
            templateUrl : 'app/askdoctor/askdoctor.html'
        };

        var askdoctorHomeState = {
            name : 'askdoctor.home',
            url : '/home',
            parent : askdoctorState,
            templateUrl : 'app/askdoctor/askdoctor-home.html'
        };

        var askdoctorListState = {
            name : 'askdoctor.list',
            parent : askdoctorState,
            url : '/:category',
            templateUrl : 'app/askdoctor/askdoctor-list.html',
            resolve : {
                questionList : resolveQuestionList,
                doctorList : resolveDoctorList,
                userList : resolveUserList
            },
            controller : 'askdoctorListController',
            controllerAs : 'vm'
        };

        var askdoctorDetailState = {
            name : 'askdoctor.detail',
            parent : askdoctorState,
            url : '/:category/:questionId',
            abstract : true,
            resolve : {
                question : resolveQuestion,
                user : resolveUser,
                doctor : resolveDoctor,
                commentList : resolveCommentList,
                ratingList : resolveRatingList,
                avgRating : resolveAvgRating
            },
            templateUrl : 'app/askdoctor/askdoctor-detail.html',
            controller : 'askdoctorDetailController',
            controllerAs : 'vm'
        };

        var askdoctorDetailReadState = {
            name : 'askdoctor.detail.read',
            parent : askdoctorDetailState,
            templateUrl : 'app/askdoctor/askdoctor-detail-read.html'
        };

        var askdoctorDetailCommentState = {
            name : 'askdoctor.detail.comment',
            parent : askdoctorDetailState,
            templateUrl : 'app/askdoctor/askdoctor-detail-comment.html',
            controller : 'askdoctorDetailCommentController',
            controllerAs : 'vm'
        };

        /* Askdoctor System Routing */

        $stateProvider
            .state(askdoctorState)
            .state(askdoctorHomeState)
            .state(askdoctorListState)
            .state(askdoctorDetailState)
            .state(askdoctorDetailReadState)
            .state(askdoctorDetailCommentState);

        /* resolve functions */

        function resolveQuestionList($stateParams) {
            // body...
        }

        function resolveDoctorList($stateParams) {
            // body...
        }

        function resolveUserList() {
            // body...
        }

        function resolveQuestion($stateParams) {
            // body...
        }

        function resolveDoctor(question) {
            // body...
        }

        function resolveUser(question) {
            // body...
        }

        function resolveCommentList(question) {
            // body...
        }

        function resolveRatingList(question) {
            // body...
        }

        function resolveAvgRating(ratingList) {
            // body...
        }
    }

})();