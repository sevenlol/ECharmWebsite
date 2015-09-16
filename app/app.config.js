(function() {
    'use strict';

    angular.module('app')
           .config(appConfig)
           .run(appRun);

    appConfig.$inject = [
        '$stateProvider',
        '$urlRouterProvider',
        '$httpProvider',
        'LoggerProvider'
    ];

    appRun.$inject = [
        '$rootScope',
        '$window'
    ];

    function appConfig($stateProvider, $urlRouterProvider, $httpProvider, LoggerProvider) {

        LoggerProvider.enabled(false);

        $urlRouterProvider.otherwise("/home");

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl : 'app/layout/home.html',
                resolve : {
                    doctorList : resolveDoctorList,
                    doctorCount : resolveDoctorCount
                },
                controller : 'homeController',
                controllerAs : 'vm'
            })
            .state('aboutus', {
                url : '/aboutus',
                templateUrl : 'app/layout/about-us.html'
            })
            .state('privacy_policy', {
                url : '/privacy_policy',
                templateUrl : 'app/layout/privacy-policy.html'
            });

        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
        //disable IE ajax request caching
        $httpProvider.defaults.headers.common['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';


        /* resolve functions */

        resolveDoctorList.$inject = [
            'memberDoctorService'
        ];
        function resolveDoctorList(memberDoctorService) {

            var failCallback = function(error) {
                return null;
            };
            try {
                return memberDoctorService
                           .readAllDoctors(null) // FIXME accept null for idList (?)
                           .catch(failCallback);
            } catch(error) {
                return null;
            }
        }

        resolveDoctorCount.$inject = [
            'doctorList'
        ];
        function resolveDoctorCount(doctorList) {
            if (!doctorList || !angular.isArray(doctorList)) {
                return 0;
            }

            return doctorList.length;
        }
    }

    function appRun($rootScope, $window) {
        $rootScope.authenticated = false;
        $rootScope.$on("$stateChangeSuccess", function (event, currentRoute, previousRoute) {
            $window.scrollTo(0, 0);
        });
        // facebook like and share
        // the facebookAppId here is lammin's facebook App which named EcharmWeb
        $rootScope.facebookAppId = '[1480760568901096]';
    }

})();