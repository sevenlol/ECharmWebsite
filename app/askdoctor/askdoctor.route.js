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
            templateUrl : 'app/askdoctor/askdoctor-home.html',
            resolve : {
                allPopularQAList : resolveAllPopularQAList
            },
            controller : 'askdoctorHomeController',
            controllerAs : 'vm'
        };

        var askdoctorListState = {
            name : 'askdoctor.list',
            parent : askdoctorState,
            url : '/:category',
            templateUrl : 'app/askdoctor/askdoctor-list.html',
            resolve : {
                popularQAList : resolvePopularQAList,
                popularDoctorList : resolvePopularDoctorList,
                questionList : resolveQuestionList,
                myQuestionList : resolveMyQuestionList,
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
                commentUserList : resolveCommentUserList,        // FIXME, combine these two api
                commentDoctorList : resolveCommentDoctorList,
                ratingList : resolveRatingList,
                avgRating : resolveAvgRating,
                myFavQA : resolveMyFavQA
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

        resolveMyAccount.$inject = [
            'authService'
        ];

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

        resolveAllPopularQAList.$inject = [
            'popularListService'
        ];

        function resolveAllPopularQAList(popularListService) {
            if (!popularListService) return null;

            var failCallback = function(error) {
                return null;
            };

            try {
                return popularListService
                            .readAllPopularQAList()
                            .catch(failCallback);
            } catch (error) {
                return null;
            }
        }

        resolvePopularQAList.$inject = [
            '$stateParams',
            'popularListService'
        ];

        function resolvePopularQAList($stateParams, popularListService) {
            if (!$stateParams || !$stateParams.category || !popularListService) {
                return null;
            }

            var category = $stateParams.category;
            var failCallback = function(error) {
                return null;
            };

            // TODO implement new API
            if (category === 'all') {
                return null;
            }

            try {
                return popularListService
                            .readPopularQAList(category)
                            .catch(failCallback);
            } catch (error) {
                return null;
            }
        }

        resolvePopularDoctorList.$inject = [
            '$stateParams',
            'popularListService'
        ];

        function resolvePopularDoctorList($stateParams, popularListService) {
            if (!$stateParams || !$stateParams.category || !popularListService) {
                return null;
            }

            var category = $stateParams.category;
            var failCallback = function(error) {
                return null;
            };

            // TODO implement new API
            if (category === 'all') {
                return null;
            }

            try {
                return popularListService
                            .readPopularDoctorList(category)
                            .catch(failCallback);
            } catch (error) {
                return null;
            }
        }

        resolveQuestionList.$inject = [
            '$stateParams',
            'myAccount',
            'askdoctorService'
        ];

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
                               .readAllEmbeddedQuestion(isAnswered, true, true, true)
                               .catch(failCallback);
                } catch(error) {
                    return null;
                }
            }

            // read questions in category
            try {
                return askdoctorService
                           .readEmbeddedQuestionInCategory(category, isAnswered, true, true, true)
                           .catch(failCallback);
            } catch(error) {
                return null;
            }

            return null;
        }

        resolveMyQuestionList.$inject = [
            '$stateParams',
            'myAccount',
            'askdoctorService'
        ];

        function resolveMyQuestionList($stateParams, myAccount, askdoctorService) {
            // get questions for the current user

            if (!$stateParams || !$stateParams.category || !askdoctorService) {
                return null;
            }

            if (!myAccount || !myAccount.account_id) {
                return null;
            }

            var account = myAccount;
            // TODO verify category
            var category = $stateParams.category;

            var failCallback = function (error) {
                return null;
            };

            // read all questions of the current user
            if (category === 'all') {
                try {
                    return askdoctorService
                               .readAllEmbeddedQuestionByQuestionerId(account.account_id, false, true, true, true)
                               .catch(failCallback);
                } catch(error) {
                    return null;
                }
            }

            // read questions of the current user in category
            try {
                return askdoctorService
                           .readEmbeddedQuestionInCategoryByQuestionerId(category, account.account_id, false, true, true, true)
                           .catch(failCallback);
            } catch(error) {
                return null;
            }

            return null;
        }

        resolveDoctorList.$inject = [
            'questionList',
            'memberDoctorService'
        ];

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

        resolveUserList.$inject = [
            'questionList',
            'memberUserService'
        ];

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

        resolveQuestion.$inject = [
            '$stateParams',
            'askdoctorQuestionService'
        ];

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

        resolveAnswer.$inject = [
            '$stateParams',
            'askdoctorAnswerService'
        ];

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

        resolveDoctor.$inject = [
            'answer',
            'memberDoctorService'
        ];

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

        resolveUser.$inject = [
            'question',
            'memberUserService'
        ];

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

        resolveCommentList.$inject = [
            'question',
            'askdoctorCommentService'
        ];

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

        resolveCommentUserList.$inject = [
            'commentList',
            'memberUserService'
        ];

        function resolveCommentUserList(commentList, memberUserService) {
            if (!commentList || !memberUserService || !angular.isArray(commentList)) {
                return null;
            }

            if (commentList.length === 0) {
                return null;
            }

            var idList = [];
            for (var i in commentList) {
                if (!commentList[i] || !angular.isString(commentList[i].commenter_id) ||
                    !commentList[i].commenter_id) {
                    continue;
                }

                idList.push(commentList[i].commenter_id);
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

        resolveCommentDoctorList.$inject = [
            'commentList',
            'memberDoctorService'
        ];

        function resolveCommentDoctorList(commentList, memberDoctorService) {
            if (!commentList || !memberDoctorService || !angular.isArray(commentList)) {
                return null;
            }

            if (commentList.length === 0) {
                return null;
            }

            var idList = [];
            for (var i in commentList) {
                if (!commentList[i] || !angular.isString(commentList[i].commenter_id) ||
                    !commentList[i].commenter_id) {
                    continue;
                }

                idList.push(commentList[i].commenter_id);
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

        resolveRatingList.$inject = [
            'question',
            'askdoctorRatingService'
        ];

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

        resolveAvgRating.$inject = [
            'ratingList'
        ];

        function resolveAvgRating(ratingList) {
            if (!angular.isArray(ratingList) || !ratingList.length) {
                return 0;
            }

            var total = 0;
            var count = 0;
            for (var i in ratingList) {
                var rating = ratingList[i];
                if (!rating || !angular.isNumber(rating.rating_value)) {
                    continue;
                }

                // FIXME change limit to value file
                if (rating.rating_value < 0 || rating.rating_value > 5) {
                    continue;
                }

                total += rating.rating_value;
                count++;
            }

            if (count > 0) {
                total = total / count;
            }

            return total;
        }

        resolveMyFavQA.$inject = [
            'question',
            'favoriteMeService'
        ];

        function resolveMyFavQA(question, favoriteMeService) {
            if (!question || !favoriteMeService || !question.question_id) {
                return null;
            }

            var failCallback = function(error) {
                return null;
            };

            try {
                return favoriteMeService
                           .readMyFavoriteQA(question.question_id)
                           .catch(failCallback);
            } catch(error) {
                return null;
            }
        }
    }

})();