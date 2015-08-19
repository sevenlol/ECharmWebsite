(function() {
    'use strict';

    angular.module('app.account')
           .controller('accountSignUpUserController', accountSignUpUserController);

    accountSignUpUserController.$inject = [
        'userAccountService',
        '$state',
        'Logger'
    ];

    function accountSignUpUserController(userAccountService, $state, Logger) {
        var SIGNUP_SUCCESS_MESSAGE = '帳號註冊成功';
        var SIGNUP_FAIL_MESSAGE = 'Something is wrong!';
        var userType = {
            doctor : 'doctor',
            user : 'user'
        };
        var MIN_ACC_LENGTH = 5;
        var MAX_ACC_LENGTH = 20;
        var MIN_PW_LENGTH = 8;
        var MAX_PW_LENGTH = 20;

        // Logger object
        var logger = Logger.getInstance('app - account - signup - user');
        var vm = this;

        // for form validation
        vm.submitted = false;
        vm.agreed = false;
        vm.min = {
            acc : MIN_ACC_LENGTH,
            pw  : MIN_PW_LENGTH
        };
        vm.max = {
            acc : MAX_ACC_LENGTH,
            pw  : MAX_PW_LENGTH
        };

        // state variable: credentials
        vm.credentials = {};

        vm.signUp = signUp;


        vm.hideMessage = hideMessage;
        vm.resetForm = resetForm;

        vm.msg = {
            isShown : false,
            type : 'danger',
            text : 'text'
        };

        /* public functions */
        function signUp() {
            vm.submitted = true;

            if (!vm.agreed) {
                return;
            }

            var promise;
            var signUpSuccessCallback = (function() {
                return function(account) {

                    // TODO add handling code
                    // create failed
                    if (!account) {
                        logger.error('signUp', 'Invalid account in response!');
                        showFailMessage(SIGNUP_FAIL_MESSAGE);
                        return;
                    }

                    logger.log('signUp', 'Sign Up Succeeded');
                    // showSuccessMessage(SIGNUP_SUCCESS_MESSAGE);
                    // changed, now moving to account.signup.success state
                    $state.go('account.signup.success', { userType : userType.user });
                };
            })();

            var signUpFailCallback = (function() {
                return function(error) {
                    logger.error('signUp', 'Sign Up Failed');

                    // if error message isn't empty
                    if (error.message) {
                        logger.debug('signUp', 'Error Message: ' + error.message);
                        showFailMessage(error.message);
                    }
                    else {
                        showFailMessage(SIGNUP_FAIL_MESSAGE);
                    }
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
                showFailMessage("密碼和再次輸入密碼不一致");
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

        function hideMessage() {
            vm.msg.isShown = false;
        }

        function resetForm() {
            vm.submitted = false;
        }

        /* private functions */

        function showSuccessMessage(message) {
            vm.msg.isShown = true;
            vm.msg.type = 'success';
            vm.msg.text = angular.isString(message) ? message : "";
        }

        function showFailMessage(message) {
            vm.msg.isShown = true;
            vm.msg.type = 'danger';
            vm.msg.text = angular.isString(message) ? message : "";
        }
    }

})();