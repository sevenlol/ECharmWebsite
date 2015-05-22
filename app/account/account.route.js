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
            template : '<div ui-view></div>'
        };

        // My Account Information
        var accountMeState = {
            name : 'account.me',
            url : '/me',
            parent : accountState,
            resolve : {
                myAccount : resolveMyAccount
            },
            template : '<div ui-view></div>',
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
            template : '<div ui-view></div>'
        };

        var accountMeUserDetailState = {
            name : 'account.me.user.detail',
            url : '/detail',
            parent : accountMeUserState,
            template : '<h1>Detail</h1>',
            controller : 'accountMeUserDetailController',
            controllerAs : 'vm'
        };

        var accountMeUserEditState = {
            name : 'account.me.user.edit',
            url : '/edit',
            parent : accountMeUserState,
            template : '<h1>edit</h1>',
            controller : 'accountMeUserEditController',
            controllerAs : 'vm'
        };

        var accountMeUserQuestionState = {
            name : 'account.me.user.question',
            url : '/question',
            parent : accountMeUserState,
            template : '<h1>question</h1>',
            controller : 'accountMeUserQuestionController',
            controllerAs : 'vm'
        };

        var accountMeUserFavoriteState = {
            name : 'account.me.user.favorite',
            url : '/favorite',
            parent : accountMeUserState,
            template : '<h1>favorite</h1>',
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
            template : '<div ui-view></div>'
        };

        var accountMeDoctorDetailState = {
            name : 'account.me.doctor.detail',
            url : '/detail',
            parent : accountMeDoctorState,
            template : '<h1>Detail</h1>',
            controller : 'accountMeDoctorDetailController',
            controllerAs : 'vm'
        };

        var accountMeDoctorEditState = {
            name : 'account.me.doctor.edit',
            url : '/edit',
            parent : accountMeDoctorState,
            template : '<h1>edit</h1>',
            controller : 'accountMeDoctorEditController',
            controllerAs : 'vm'
        };

        var accountMeDoctorAnswerState = {
            name : 'account.me.doctor.answer',
            url : '/answer',
            parent : accountMeDoctorState,
            template : '<h1>answer</h1>',
            controller : 'accountMeDoctorAnswerController',
            controllerAs : 'vm'
        };

        var accountMeDoctorArticleState = {
            name : 'account.me.doctor.article',
            url : '/article',
            parent : accountMeDoctorState,
            template : '<h1>article</h1>',
            controller : 'accountMeDoctorArticleController',
            controllerAs : 'vm'
        };

        // Sign Up
        var accountSignUpState = {
            name : 'account.signup',
            url : '/signup',
            parent : accountState,
            abstract : true,
            template : '<div ui-view></div>'
        };

        var accountSignUpUserState = {
            name : 'account.signup.user',
            url : '/user',
            parent : accountSignUpState,
            template : '<h1>User Sign Up Form!</h1>',
            controller : 'accountSignUpUserController',
            controllerAs : 'vm'
        };

        var accountSignUpDoctorState = {
            name : 'account.signup.doctor',
            url : '/doctor',
            parent : accountSignUpState,
            template : '<h1>Doctor Sign Up Form!</h1>',
            controller : 'accountSignUpDoctorController',
            controllerAs : 'vm'
        };

        // Sign In
        var accountSignInState = {
            name : 'account.signin',
            url : '/signin',
            parent : accountState,
            abstract : true,
            template : '<div ui-view></div>'
        };

        var accountSignInUserState = {
            name : 'account.signin.user',
            url : '/user',
            parent : accountSignInState,
            template : '<h1>User Sign In Form!</h1>',
            controller : 'accountSignInUserController',
            controllerAs : 'vm'
        };

        var accountSignInDoctorState = {
            name : 'account.signin.doctor',
            url : '/doctor',
            parent : accountSignInState,
            template : '<h1>Doctor Sign In Form!</h1>',
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

        function resolveMyAccount() {
            // body...
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