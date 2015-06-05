(function() {
    'use strict';

    angular.module('app.account')
           .controller('accountSignUpUserController', accountSignUpUserController);

    accountSignUpUserController.$inject = [
        'userAccountService',
        'Logger'
    ];

    function accountSignUpUserController(userAccountService, Logger) {
        // Logger object
        var logger = Logger.getInstance('app - account - signup - user');
        var vm = this;

        // state variable: credentials
        vm.credentials = {};

        vm.signUp = signUp;

        /* public functions */
        function signUp() {
            var promise;
            var signUpSuccessCallback = (function() {
                return function(account) {

                    // TODO add handling code
                    // create failed
                    if (!account) {
                        logger.error('signUp', 'Invalid account in response!');
                        return;
                    }

                    logger.log('signUp', 'Sign Up Succeeded');
                    // created succeeded
                };
            })();

            var signUpFailCallback = (function() {
                return function(error) {
                    logger.error('signUp', 'Sign Up Failed');

                    // if error message isn't empty
                    if (error.message)
                        logger.debug('signUp', 'Error Message: ' + error.message);
                };
            })();

            // TODO check input
            if (!vm.credentials.username || !vm.credentials.password ||
                !vm.credentials.email || !vm.credentials.confirmPassword) {
                logger.error('signUp', 'Some credential fields are missing!');
                logger.debug('signUp', 'Username: {0}, Password: {1}, Email: {2}, Confirm Password: {3}',
                                        [ vm.credentials.username, vm.credentials.password, vm.credentials.email, vm.credentials.confirmPassword ]);
                return;
            }

            if (vm.credentials.password !== vm.credentials.confirmPassword) {
                logger.error('signUp', 'Password should be the same as Confirm Password');
                logger.debug('signUp', 'Password: {0}, Confirm Password: {1}', [ vm.credentials.password, vm.credentials.confirmPassword ]);
                return;
            }

            vm.credentials.account_type = 'ECHARM';
            vm.credentials.salt = 'salt';
            vm.credentials.created_at = (new Date()).toLocaleDateString();
            vm.credentials.user_info = {};

            logger.log('signUp', 'Credentials validation done! Signing Up ...');
            try {
                promise = userAccountService.createUserAccount(vm.credentials);
                promise
                    .then(signUpSuccessCallback)
                    .catch(signUpFailCallback);
            } catch (err) {
                // TODO input error
                logger.error('signUp', 'Invalid Input: Credentials');
            }

        }
    }

})();