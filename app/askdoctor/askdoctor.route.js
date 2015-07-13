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
            resolve : {
                myAccount : resolveMyAccount
            },
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
            resolve : {
                question : resolveQuestion,
                answer : resolveAnswer,
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

        /* Askdoctor System Routing */

        $stateProvider
            .state(askdoctorState)
            .state(askdoctorHomeState)
            .state(askdoctorListState)
            .state(askdoctorDetailState);

        /* resolve functions */

        function resolveMyAccount(authService) {
            if (!authService) {
                return null;
            }

            /* Check authentication status */
            var successCallback = (function() {
                return function(res) {
                    return res.data;
                };
            })();
            var failCallback = (function() {
                return function(res) {
                    return null;
                };
            })();

            // check if the user is logged in
            var promise = authService.checkAuthStatus(null, null);
            return promise
                    .then(successCallback)
                    .catch(failCallback);
        }

        function resolveQuestionList($stateParams, myAccount, askdoctorService) {
            if (!$stateParams || !$stateParams.category || !askdoctorService) {
                return null;
            }

            var account = myAccount;
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

        function resolveQuestion($stateParams, askdoctorQuestionService) {
            if (!$stateParams || !$stateParams.category ||
                !askdoctorQuestionService || !$stateParams.questionId) {
                return null;
            }

            var category = $stateParams.category;
            var questionId = $stateParams.questionId;
            // TODO verify category

            var failCallback = function(error) {
                return null;
            };

            try {
                return askdoctorQuestionService
                           .readQuestion(category, questionId)
                           .catch(failCallback);
            } catch(error) {
                return null;
            }

            return null;
        }

        function resolveAnswer($stateParams, askdoctorAnswerService) {
            if (!$stateParams || !$stateParams.category ||
                !askdoctorAnswerService || !$stateParams.questionId) {
                return null;
            }

            var category = $stateParams.category;
            var questionId = $stateParams.questionId;
            // TODO verify category

            var failCallback = function(error) {
                return null;
            };

            // Note: change if allowing more than 1 answer for each question
            var successCallback = function(answerList) {
                if (angular.isArray(answerList) && answerList) {
                    return answerList[0];
                }

                return null;
            };

            try {
                return askdoctorAnswerService
                           .readAllAnswer(category, questionId)
                           .then(successCallback)
                           .catch(failCallback);
            } catch(error) {
                return null;
            }

            return null;
        }

        function resolveDoctor(answer, memberDoctorService) {
            if (!answer || !memberDoctorService || !answer.answerer_id) {
                return null;
            }

            var id = answer.answerer_id;
            var idList = [ id ];

            var failCallback = function(error) {
                return null;
            };

            var successCallback = function(doctorList) {
                if (angular.isArray(doctorList)) {
                    return doctorList[0];
                }

                return null;
            };

            // read doctor
            try {
                return memberDoctorService
                           .readAllDoctors(idList)
                           .then(successCallback)
                           .catch(failCallback);
            } catch(error) {
                return null;
            }

            return null;
        }

        function resolveUser(question, memberUserService) {
            if (!question || !memberUserService || !question.questioner_id) {
                return null;
            }

            var id = question.questioner_id;
            var idList = [ id ];

            var failCallback = function(error) {
                return null;
            };

            var successCallback = function(userList) {
                if (angular.isArray(userList)) {
                    return userList[0];
                }

                return null;
            };

            // read doctors
            try {
                return memberUserService
                           .readUsers(idList)
                           .then(successCallback)
                           .catch(failCallback);
            } catch(error) {
                return null;
            }

            return null;
        }

        function resolveCommentList(question, askdoctorCommentService) {
            if (!question || !askdoctorCommentService || !question.question_id) {
                return null;
            }

            if (!question.category) {
                return null;
            }

            var category = question.category;
            var id = question.question_id;

            // TODO verify category

            var failCallback = function(error) {
                return null;
            };

            try {
                return askdoctorCommentService
                           .readAllComment(category, id)
                           .catch(failCallback);
            } catch(error) {
                return null;
            }

            return null;
        }

        function resolveRatingList(question, askdoctorRatingService) {
            if (!question || !askdoctorRatingService || !question.question_id) {
                return null;
            }

            if (!question.category) {
                return null;
            }

            var category = question.category;
            var id = question.question_id;

            // TODO verify category

            var failCallback = function(error) {
                return null;
            };

            try {
                return askdoctorRatingService
                           .readAllRating(category, id)
                           .catch(failCallback);
            } catch(error) {
                return null;
            }

            return null;
        }

        function resolveAvgRating(ratingList) {
            if (!angular.isArray(ratingList) || !ratingList.length) {
                return 0;
            }

            var total = 0;
            var count = 0;
            for (var i in ratingList) {
                var rating = ratingList[i];
                if (!angular.isNumber(rating)) {
                    continue;
                }

                // FIXME change limit to value file
                if (rating < 0 || rating > 5) {
                    continue;
                }

                total += rating;
                count++;
            }

            if (count > 0) {
                total = total / count;
            }

            return total;
        }
    }

})();