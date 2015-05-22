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
            abstract : true,
            template : '<h1>Content Bar</h1><h1>Category List</h1><div ui-view></div>'
        };

        var askdoctorHomeState = {
            name : 'askdoctor.home',
            parent : askdoctorState,
            template : '<h1>Home</h1>'
        };

        var askdoctorListState = {
            name : 'askdoctor.list',
            parent : askdoctorState,
            url : '/:category',
            template : '<h1>Question List</h1>',
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
            template : '<h1>Q & A Content</h1><div ui-view></div>',
            controller : 'askdoctorDetailController',
            controllerAs : 'vm'
        };

        var askdoctorDetailReadState = {
            name : 'askdoctor.detail.read',
            parent : askdoctorDetailState,
            template : '<button>Leave a comment!</button>'
        };

        var askdoctorDetailCommentState = {
            name : 'askdoctor.detail.comment',
            parent : askdoctorDetailState,
            template : '<button>Submit!</button>',
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