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
        var doctorState = {
            name : 'account.doctor',
            url : '/doctor',
            abstract : true,
            template : '<div ui-view></div>'
        };

        var doctorListState = {
            name : 'account.doctor.list',
            url : '/:category',
            parent : doctorState,
            resolve : {
                doctorList : resolveDoctorList
            },
            template : '<h1>Doctor List!</h1>',
            controller : 'doctorListController',
            controllerAs : 'vm'
        };

        var doctorDetailState = {
            name : 'account.doctor.detail',
            url : '/:category/:doctorId',
            parent : doctorState,
            resolve : {
                doctor : resolveDoctor,
                articleList : resolveDoctorArticleList,
                answerList : resolveDoctorAnswerList
            },
            template : '<h1>Doctor Detail!</h1>',
            controller : 'doctorDetailController',
            controllerAs : 'vm'
        };


        /* Doctor Information Routing*/

        $stateProvider
            .state(doctorState)
            .state(doctorListState)
            .state(doctorDetailState);


        /* resolve functions */

        function resolveDoctorList($stateParams) {
            // body...
        }

        function resolveDoctor($stateParams) {
            // body...
        }

        function resolveDoctorArticleList(doctor) {
            // body...
        }

        function resolveDoctorAnswerList(doctor) {
            // body...
        }
    }

})();