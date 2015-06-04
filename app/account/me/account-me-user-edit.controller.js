(function() {
    'use strict';

    angular.module('app.account')
           .controller('accountMeUserEditController', accountMeUserEditController);

    accountMeUserEditController.$inject = [
        'user',
        'memberUserService',
        '$rootScope',
        '$state',
        'Logger'
    ];

    function accountMeUserEditController(user, memberUserService, $rootScope, $state, Logger) {
        // Logger object
        var logger = Logger.getInstance('app - account - me - user - edit');
        var vm = this;

        vm.user = user;
        vm.updateMyInfo = updateMyInfo;

        if (!vm.user) {
            // TODO error handle
            logger.error('Controller', 'Cannot get my account information!');
        }
        logger.log('Controller', 'Get my account information successfully!');

        /* public functions */

        function updateMyInfo() {
            if (!vm.user) {
                // TODO error handle
                logger.error('updateMyInfo', 'vm.user should not be null');
                return;
            }

            var userAccount = {};
            var info = vm.user.user_info;

            var successCallback = (function($rootScope, $state, logger) {
                return function(account) {
                    logger.log('updateMyInfo', 'Update my account information successfully!');
                    $rootScope.authenticated = true;
                    $state.go('account.me.user.detail');
                };
            })($rootScope, $state, logger);

            var failCallback = (function($state, logger) {
                return function(error) {
                    // Update failed, reload detail to get the right info
                    logger.error('updateMyInfo', 'Update my account information failed!');
                    logger.error('updateMyInfo', 'Error Message: {0}', [ error.message ]);
                    logger.debug('updateMyInfo', 'Error: {0}', [ JSON.stringify(error, null, 2) ]);
                    $state.go('account.me.user.detail', { reload : true });
                };
            })($state, logger);

            if (!info.name && !info.gender &&
                !info.phone_number && !info.address) {
                // all fields null
                logger.error('updateMyInfo', 'All fields missing! Please enter something!');
                return;
            }

            // copy
            userAccount.user_info = angular.copy(info);

            logger.log('updateMyInfo', 'Input validation done! Updating my account information!');
            try {
                var promise = memberUserService.updateMeUser(userAccount);
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