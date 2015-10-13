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
                qaList : resolveDoctorQAList, // question and answer list
                avgQaRating : resolveDoctorAvgQaRating
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

        resolveDoctorList.$inject = [
            '$stateParams',
            'memberDoctorService'
        ];

        function resolveDoctorList($stateParams, memberDoctorService) {
            if (!$stateParams || !$stateParams.category || !memberDoctorService) {
                return null;
            }

            // TODO verify category
            var category = $stateParams.category;

            var failCallback = function(error) {
                return null;
            };

            // read all doctors
            // FIXME move 'all' to value file
            if (category === 'all') {
                try {
                    return memberDoctorService
                               .readAllDoctors(null) // FIXME accept null for idList (?)
                               .catch(failCallback);
                } catch(error) {
                    return null;
                }
            }

            // read doctor in category
            try {
                return memberDoctorService
                           .readDoctorsInCategory(category, null) // FIXME accept null for idList (?)
                           .catch(failCallback);
            } catch(error) {
                return null;
            }

            return null;
        }

        resolveDoctor.$inject = [
            '$stateParams',
            'memberDoctorService'
        ];

        function resolveDoctor($stateParams, memberDoctorService) {
            if (!$stateParams || !$stateParams.category || !memberDoctorService ||
                !$stateParams.doctorId) {
                return null;
            }

            var category = $stateParams.category;
            var doctorId = $stateParams.doctorId;
            // TODO verify category

            var idList = [ doctorId ];

            var successCallback = function(doctorList) {
                if (angular.isArray(doctorList)) {
                    return doctorList[0];
                }

                return null;
            };

            var failCallback = function(error) {
                return null;
            };

            // read all doctors
            // FIXME move 'all' to value file
            if (category === 'all') {
                try {
                    return memberDoctorService
                               .readAllDoctors(idList)
                               .then(successCallback)
                               .catch(failCallback);
                } catch(error) {
                    return null;
                }
            }

            // read doctor in category
            try {
                return memberDoctorService
                           .readDoctorsInCategory(category, idList)
                           .then(successCallback)
                           .catch(failCallback);
            } catch(error) {
                return null;
            }

            return null;
        }

        resolveDoctorArticleList.$inject = [
            'doctor',
            'blogArticleService'
        ];

        function resolveDoctorArticleList(doctor, blogArticleService) {
            if (!doctor || !angular.isString(doctor.account_id) || !doctor.account_id) {
                return null;
            }

            var failCallback = function(error) {
                return null;
            };

            try {
                return blogArticleService
                           .readArticleByAuthorId('', doctor.account_id)
                           .catch(failCallback);
            } catch(error) {
                return null;
            }
        }

        resolveDoctorQAList.$inject = [
            'doctor',
            'askdoctorService'
        ];

        function resolveDoctorQAList(doctor, askdoctorService) {
            if (!doctor || !askdoctorService || !doctor.account_id) {
                return null;
            }

            var id = doctor.account_id;

            var failCallback = function(error) {
                return null;
            };

            try {
                return askdoctorService
                           .readAllEmbeddedQuestionByAnswererId(id, true, true, true, true)
                           .catch(failCallback);
            } catch(error) {
                return null;
            }

            return null;
        }

        resolveDoctorAvgQaRating.$inject = [
            'qaList'
        ];

        function resolveDoctorAvgQaRating(qaList) {
            if (!qaList || !angular.isArray(qaList) || qaList.length === 0) {
                return null;
            }

            var total = 0;
            var count = 0;
            for (var i in qaList) {
                if (!qaList[i] || !qaList[i].rating_list ||
                    !angular.isArray(qaList[i].rating_list) || qaList[i].rating_list.length === 0) {
                    continue;
                }

                var ratingList = qaList[i].rating_list;
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
    }

})();