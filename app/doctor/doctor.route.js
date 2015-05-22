(function() {
    'use strict';

    angular.module('app.doctor')
           .config(doctorConfig);

    doctorConfig.$inject = [
        '$stateProvider'
    ];

    function doctorConfig($stateProvider) {

        /* State Objects */

        // Doctor Information
        var accountDoctorState = {
            name : 'account.doctor',
            url : '/doctor',
            parent : accountState,
            abstract : true,
            template : '<div ui-view></div>'
        };

        var accountDoctorListState = {
            name : 'account.doctor.list',
            url : '/:category',
            parent : accountDoctorState,
            resolve : {
                doctorList : resolveDoctorList
            },
            template : '<h1>Doctor List!</h1>',
            controller : 'doctorListController'
        };

        var accountDoctorDetailState = {
            name : 'account.doctor.detail',
            url : '/:category/:doctorId',
            parent : accountDoctorState,
            resolve : {
                doctor : resolveDoctor,
                articleList : resolveDoctorArticleList,
                answerList : resolveDoctorAnswerList
            },
            template : '<h1>Doctor Detail!</h1>',
            controller : 'doctorDetailController'
        };


        /* Doctor Information Routing*/

        $stateProvider
            .state(accountDoctorState)
            .state(accountDoctorListState)
            .state(accountDoctorDetailState);


        /* resolve functions */

        function resolveDoctorList() {
            // body...
        }

        function resolveDoctor() {
            // body...
        }

        function resolveDoctorArticleList() {
            // body...
        }

        function resolveDoctorAnswerList() {
            // body...
        }
    }

})();