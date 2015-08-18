(function() {
    'use strict';

    angular.module('app.account')
           .controller('accountMeDoctorEditController', accountMeDoctorEditController);

    accountMeDoctorEditController.$inject = [
        'doctor',
        'memberDoctorService',
        '$rootScope',
        '$state',
        'Logger'
    ];

    function accountMeDoctorEditController(doctor, memberDoctorService, $rootScope, $state, Logger) {

        var MALE_STRING = 'MALE';
        var FEMALE_STRING = 'FEMALE';
        var ARBITRARY_GENDER_STRING = 'ARBITRARY';

        // Logger object
        var logger = Logger.getInstance('app - account - me - doctor - edit');
        var vm = this;

        vm.GENDER_STRING = {
            MALE : MALE_STRING,
            FEMALE : FEMALE_STRING,
            ARBITRARY : ARBITRARY_GENDER_STRING
        };

        vm.doctor= doctor;
        vm.updateMyInfo = updateMyInfo;

        if (!vm.doctor) {
            // TODO error handle
            logger.error('Controller', 'Cannot get my account information!');
        }
        logger.log('Controller', 'Get my account information successfully!');

        /* public functions */

        function updateMyInfo() {
            if (!vm.doctor) {
                // TODO error handle
                logger.error('updateMyInfo', 'vm.doctor should not be null');
                return;
            }

            var doctorAccount = {};
            var info = vm.doctor.user_info;

            var successCallback = (function($rootScope, $state, logger) {
                return function(account) {
                    console.log(JSON.stringify(account.user_info, null, 2));
                    logger.log('updateMyInfo', 'Update my account information successfully!');
                    $rootScope.authenticated = true;
                    $state.go('account.me.doctor.detail');
                };
            })($rootScope, $state, logger);

            var failCallback = (function($state, logger) {
                return function(error) {
                    // Update failed, reload detail to get the right info
                    logger.error('updateMyInfo', 'Update my account information failed!');
                    logger.error('updateMyInfo', 'Error Message: {0}', [ error.message ]);
                    logger.debug('updateMyInfo', 'Error: {0}', [ JSON.stringify(error, null, 2) ]);
                    $state.go('account.me.doctor.detail', { reload : true });
                };
            })($state, logger);

            // all fields null
            if (!info.name && !info.gender && !info.phone_number && !info.address &&
                !info.current_hospital && !info.college && !info.title && !info.specialty &&
                !info.available_time && !info.facebook_account && !info.blog_url) {
                logger.error('updateMyInfo', 'All fields missing! Please enter something!');
                return;
            }

            // copy
            doctorAccount.user_info = angular.copy(info);

            logger.log('updateMyInfo', 'Input validation done! Updating my account information!');
            try {
                var promise = memberDoctorService.updateMeDoctor(doctorAccount);
                promise
                    .then(successCallback)
                    .catch(failCallback);
            } catch (error) {
                // TODO handle input error, shouldn't happen
                logger.error('updateMyInfo', 'Input Error: {0}', [ error.message ]);
                logger.error('updateMyInfo', 'Error: {0}', [ JSON.stringify(error, null, 2) ]);
            }
        }
    }

})();