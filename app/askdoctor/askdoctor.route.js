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

        function resolveQuestionList($stateParams, $rootScope, askdoctorService) {
            if (!$stateParams || !$stateParams.category || !askdoctorService) {
                return null;
            }

            var account = $rootScope.account;
            // TODO verify category
            var category = $stateParams.category;

            var failCallback = function(error) {
                return null;
            };

            var isAnswered = true;

            // get both answered and unanswered questions
            if (account && account.user_type === 'DOCTOR') {
                isAnswered = false;
            }

            // no account or USER, only sees answered questions

            // read all questions
            if (category === 'all') {
                try {
                    return askdoctorService
                               .readAllEmbeddedQuestion(isAnswered, true, false, false)
                               .catch(failCallback);
                } catch(error) {
                    return null;
                }
            }

            // read questions in category
            try {
                return askdoctorService
                           .readEmbeddedQuestionInCategory(category, isAnswered, true, false, false)
                           .catch(failCallback);
            } catch(error) {
                return null;
            }

            return null;
        }

        function resolveDoctorList(questionList, memberDoctorService) {
            if (!questionList || !memberDoctorService || !angular.isArray(questionList)) {
                return null;
            }

            if (questionList.length === 0) {
                return null;
            }

            var idList = [];
            for (var i in questionList) {

                if (!questionList[i] || !angular.isObject(questionList[i].answer) ||
                    !questionList[i].answer) {
                    continue;
                }

                if (!questionList[i].answer.answerer_id ||
                    !angular.isString(questionList[i].answer.answerer_id)) {
                    continue;
                }

                idList.push(questionList[i].answer.answerer_id);
            }

            var failCallback = function(error) {
                return null;
            };

            // read doctors
            try {
                return memberDoctorService
                           .readAllDoctors(idList)
                           .catch(failCallback);
            } catch(error) {
                return null;
            }

            return null;
        }

        function resolveUserList(questionList, memberUserService) {
            if (!questionList || !memberUserService || !angular.isArray(questionList)) {
                return null;
            }

            if (questionList.length === 0) {
                return null;
            }

            var idList = [];
            for (var i in questionList) {
                if (!questionList[i] || !angular.isString(questionList[i].questioner_id) ||
                    !questionList[i].questioner_id) {
                    continue;
                }

                idList.push(questionList[i].questioner_id);
            }

            var failCallback = function(error) {
                return null;
            };

            // read users
            try {
                return memberUserService
                           .readUsers(idList)
                           .catch(failCallback);
            } catch(error) {
                return null;
            }

            return null;
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