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
            name : 'doctor',
            url : '^/doctor',
            abstract : true,
            templateUrl : 'app/doctor/doctor.html'
        };

        var doctorListState = {
            name : 'doctor.list',
            url : '/:category',
            parent : doctorState,
            resolve : {
                doctorList : resolveDoctorList
            },
            templateUrl : 'app/doctor/doctor-list.html',
            controller : 'doctorListController',
            controllerAs : 'vm'
        };

        var doctorDetailState = {
            name : 'doctor.detail',
            url : '/:category/:doctorId',
            parent : doctorState,
            resolve : {
                doctor : resolveDoctor,
                articleList : resolveDoctorArticleList,
                answerList : resolveDoctorAnswerList
            },
            templateUrl : 'app/doctor/doctor-detail.html',
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