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
            url : '/me',
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
            url : '/user',
            parent : accountMeState,
            resolve: {
                user : resolveMeUser,
                questionList : resolveMeUserQuestionList,
            },
            abstract : true,
            templateUrl : 'app/account/me/account-me-user.html'
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

        var accountMeUserFavoriteState = {
            name : 'account.me.user.favorite',
            url : '/favorite',
            parent : accountMeUserState,
            templateUrl : 'app/account/me/account-me-user-favorite.html',
            controller : 'accountMeUserFavoriteController',
            controllerAs : 'vm'
        };

        var accountMeDoctorState = {
            name : 'account.me.doctor',
            url : '/doctor',
            parent : accountMeState,
            abstract : true,
            resolve : {
                doctor : resolveMeDoctor,
                answerList : resolveMeDoctorAnswerList,
                articleList : resolveMeDoctorArticleList
            },
            templateUrl : 'app/account/me/account-me-doctor.html'
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
            .state(accountMeUserFavoriteState)
            .state(accountMeDoctorState)
            .state(accountMeDoctorDetailState)
            .state(accountMeDoctorEditState)
            .state(accountMeDoctorAnswerState)
            .state(accountMeDoctorArticleState);

        // sign up
        $stateProvider
            .state(accountSignUpState)
            .state(accountSignUpUserState)
            .state(accountSignUpDoctorState);

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

            return authService.checkAuthStatus(null, null)
                              .then(callback)
                              .catch(callback);
        }

        function resolveMeUser(myAccount) {
            // body...
        }

        function resolveMeUserQuestionList(myAccount) {
            // body...
        }

        function resolveMeDoctor(myAccount) {
            // body...
        }

        function resolveMeDoctorAnswerList(myAccount) {
            // body...
        }

        function resolveMeDoctorArticleList(myAccount) {
            // body...
        }

    }

})();