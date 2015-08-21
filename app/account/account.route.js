(function() {
    'use strict';

    angular.module('app.account')
           .config(accountConfig);

    accountConfig.$inject = [
        '$stateProvider'
    ];

    function accountConfig($stateProvider) {

        /* State Objects */

        var accountState = {
            name : 'account',
            url : '/account',
            abstract : true,
            templateUrl : 'app/account/account.html'
        };

        // My Account Information
        var accountMeState = {
            name : 'account.me',
            url : '/me/:detailCategory',
            parent : accountState,
            resolve : {
                myAccount : resolveMyAccount
            },
            templateUrl : 'app/account/me/account-me.html',
            controller : 'accountMeController',
            controllerAs : 'vm'
        };

        var accountMeUserState = {
            name : 'account.me.user',
            url : '^/account/user',
            parent : accountMeState,
            resolve: {
                user : resolveMeUser,
                questionList : resolveMeUserQuestionList,
                favoriteList : resolveMeFavoriteList
            },
            abstract : true,
            templateUrl : 'app/account/me/account-me-user.html',
            controller : 'accountMeUserController',
            controllerAs : 'vm'
        };

        var accountMeUserDetailState = {
            name : 'account.me.user.detail',
            url : '/detail',
            parent : accountMeUserState,
            templateUrl : 'app/account/me/account-me-user-detail.html',
            controller : 'accountMeUserDetailController',
            controllerAs : 'vm'
        };

        var accountMeUserEditState = {
            name : 'account.me.user.edit',
            url : '/edit',
            parent : accountMeUserState,
            templateUrl : 'app/account/me/account-me-user-edit.html',
            controller : 'accountMeUserEditController',
            controllerAs : 'vm'
        };

        var accountMeUserQuestionState = {
            name : 'account.me.user.question',
            url : '/question',
            parent : accountMeUserState,
            templateUrl : 'app/account/me/account-me-user-question.html',
            controller : 'accountMeUserQuestionController',
            controllerAs : 'vm'
        };

        var accountMeUserFavoriteArticleState = {
            name : 'account.me.user.favArticle',
            url : '/favorite/article',
            parent : accountMeUserState,
            templateUrl : 'app/account/me/account-me-user-favorite-article.html',
            controller : 'accountMeUserFavoriteArticleController',
            controllerAs : 'vm'
        };

        var accountMeUserFavoriteQAState = {
            name : 'account.me.user.favQA',
            url : '/favorite/qa',
            parent : accountMeUserState,
            templateUrl : 'app/account/me/account-me-user-favorite-qa.html',
            controller : 'accountMeUserFavoriteQAController',
            controllerAs : 'vm'
        };

        var accountMeDoctorState = {
            name : 'account.me.doctor',
            url : '^/account/doctor',
            parent : accountMeState,
            abstract : true,
            resolve : {
                doctor : resolveMeDoctor,
                answerList : resolveMeDoctorAnswerList,
                avgAnswerRating : resolveMeDoctorAvgAnswerRating,
                articleList : resolveMeDoctorArticleList
            },
            templateUrl : 'app/account/me/account-me-doctor.html',
            controller : 'accountMeDoctorController',
            controllerAs : 'vm'
        };

        var accountMeDoctorDetailState = {
            name : 'account.me.doctor.detail',
            url : '/detail',
            parent : accountMeDoctorState,
            templateUrl : 'app/account/me/account-me-doctor-detail.html',
            controller : 'accountMeDoctorDetailController',
            controllerAs : 'vm'
        };

        var accountMeDoctorEditState = {
            name : 'account.me.doctor.edit',
            url : '/edit',
            parent : accountMeDoctorState,
            templateUrl : 'app/account/me/account-me-doctor-edit.html',
            controller : 'accountMeDoctorEditController',
            controllerAs : 'vm'
        };

        var accountMeDoctorAnswerState = {
            name : 'account.me.doctor.answer',
            url : '/answer',
            parent : accountMeDoctorState,
            templateUrl : 'app/account/me/account-me-doctor-answer.html',
            controller : 'accountMeDoctorAnswerController',
            controllerAs : 'vm'
        };

        var accountMeDoctorArticleState = {
            name : 'account.me.doctor.article',
            url : '/article',
            parent : accountMeDoctorState,
            templateUrl : 'app/account/me/account-me-doctor-article.html',
            controller : 'accountMeDoctorArticleController',
            controllerAs : 'vm'
        };

        // Sign Up
        var accountSignUpState = {
            name : 'account.signup',
            url : '/signup',
            parent : accountState,
            abstract : true,
            templateUrl : 'app/account/signup/account-signup.html'
        };

        var accountSignUpUserState = {
            name : 'account.signup.user',
            url : '/user',
            parent : accountSignUpState,
            templateUrl : 'app/account/signup/account-signup-user.html',
            controller : 'accountSignUpUserController',
            controllerAs : 'vm'
        };

        var accountSignUpDoctorState = {
            name : 'account.signup.doctor',
            url : '/doctor',
            parent : accountSignUpState,
            templateUrl : 'app/account/signup/account-signup-doctor.html',
            controller : 'accountSignUpDoctorController',
            controllerAs : 'vm'
        };

        var accountSignUpSuccessState = {
            name : 'account.signup.success',
            url : '/success/:userType',
            parent : accountSignUpState,
            templateUrl : 'app/account/signup/account-signup-success.html',
            controller : 'accountSignUpSuccessController',
            controllerAs : 'vm'
        };

        // Sign In
        var accountSignInState = {
            name : 'account.signin',
            url : '/signin',
            parent : accountState,
            abstract : true,
            templateUrl : 'app/account/signin/account-signin.html'
        };

        var accountSignInUserState = {
            name : 'account.signin.user',
            url : '/user',
            parent : accountSignInState,
            templateUrl : 'app/account/signin/account-signin-user.html',
            controller : 'accountSignInUserController',
            controllerAs : 'vm'
        };

        var accountSignInDoctorState = {
            name : 'account.signin.doctor',
            url : '/doctor',
            parent : accountSignInState,
            templateUrl : 'app/account/signin/account-signin-doctor.html',
            controller : 'accountSignInDoctorController',
            controllerAs : 'vm'
        };

        /* Account System Routing */

        // my account information
        $stateProvider
            .state(accountState)
            .state(accountMeState)
            .state(accountMeUserState)
            .state(accountMeUserDetailState)
            .state(accountMeUserEditState)
            .state(accountMeUserQuestionState)
            .state(accountMeUserFavoriteArticleState)
            .state(accountMeUserFavoriteQAState)
            .state(accountMeDoctorState)
            .state(accountMeDoctorDetailState)
            .state(accountMeDoctorEditState)
            .state(accountMeDoctorAnswerState)
            .state(accountMeDoctorArticleState);

        // sign up
        $stateProvider
            .state(accountSignUpState)
            .state(accountSignUpUserState)
            .state(accountSignUpDoctorState)
            .state(accountSignUpSuccessState);

        // sign in
        $stateProvider
            .state(accountSignInState)
            .state(accountSignInUserState)
            .state(accountSignInDoctorState);

        /* resolve functions */

        resolveMyAccount.$inject = [
            'authService'
        ];

        function resolveMyAccount(authService) {
            if (!authService || !authService.checkAuthStatus)
                return null;

            // TODO figure promise out ...
            var callback = function(res) {
                // not authenticated
                if (res.status !== 200)
                    return null;

                return res.data;
            };

            return authService
                    .checkAuthStatus(null, null)
                    .then(callback)
                    .catch(callback);
        }

        function resolveMeUser(myAccount) {
            return myAccount;
        }

        function resolveMeUserQuestionList(myAccount, askdoctorService) {
            if (!myAccount || !askdoctorService || !myAccount.account_id) {
                return null;
            }

            var id = myAccount.account_id;

            var failCallback = function(error) {
                return null;
            };

            try {
                return askdoctorService
                           .readAllEmbeddedQuestionByQuestionerId(id, false, true, false, false)
                           .catch(failCallback);
            } catch(error) {
                return null;
            }

            return null;
        }

        function resolveMeFavoriteList(myAccount, favoriteMeService) {
            if (!myAccount || !favoriteMeService || !myAccount.account_id) {
                return null;
            }

            var failCallback = function(error) {
                return null;
            };

            try {
                return favoriteMeService
                            .readMyFavoriteList()
                            .catch(failCallback);
            } catch(error) {
                return null;
            }
        }

        function resolveMeDoctor(myAccount) {
            return myAccount;
        }

        function resolveMeDoctorAnswerList(myAccount, askdoctorService) {
            if (!myAccount || !askdoctorService || !myAccount.account_id) {
                return null;
            }

            var id = myAccount.account_id;

            var failCallback = function(error) {
                return null;
            };

            try {
                return askdoctorService
                           .readAllEmbeddedQuestionByAnswererId(id, true, true, false, true)
                           .catch(failCallback);
            } catch(error) {
                return null;
            }

            return null;
        }

        function resolveMeDoctorAvgAnswerRating(answerList) {
            if (!answerList || !angular.isArray(answerList) || answerList.length === 0) {
                return null;
            }

            var total = 0;
            var count = 0;
            for (var i in answerList) {
                if (!answerList[i] || !answerList[i].rating_list ||
                    !angular.isArray(answerList[i].rating_list) || answerList[i].rating_list.length === 0) {
                    continue;
                }

                var ratingList = answerList[i].rating_list;
                for (var j in ratingList) {
                    if (!ratingList[j] || !angular.isNumber(ratingList[j].rating_value)) {
                        continue;
                    }

                    if (ratingList[j].rating_value >= 0 && ratingList[j].rating_value <= 5) {
                        total += ratingList[j].rating_value;
                        count++;
                    }
                }
            }

            if (count > 0) {
                var avgRatingObj = {
                    number : total / count,
                    count : count
                };
                return avgRatingObj;
            }

            return null;
        }

        function resolveMeDoctorArticleList(myAccount, blogArticleService) {
            if (!myAccount || !angular.isString(myAccount.account_id) || !myAccount.account_id) {
                return null;
            }

            var failCallback = function(error) {
                return null;
            };

            try {
                return blogArticleService
                           .readArticleByAuthorId('', myAccount.account_id)
                           .catch(failCallback);
            } catch(error) {
                return null;
            }

        }

    }

})();