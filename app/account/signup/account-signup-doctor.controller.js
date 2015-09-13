(function() {
    'use strict';

    angular.module('app.account')
           .controller('accountSignUpDoctorController', accountSignUpDoctorController);

    accountSignUpDoctorController.$inject = [
        'memberDoctorService',
        '$state',
        '$modal',
        'Logger'
    ];

    function accountSignUpDoctorController(memberDoctorService, $state, $modal, Logger) {
        var SIGNUP_SUCCESS_MESSAGE = '帳號註冊成功';
        var SIGNUP_FAIL_MESSAGE = 'Something is wrong!';
        var userType = {
            doctor : 'doctor',
            user : 'user'
        };

        // Logger object
        var logger = Logger.getInstance('app - account - signup - doctor');
        var vm = this;

        // for form validation
        vm.submitted = false;
        vm.agreed = false;

        // state variable: doctor
        vm.doctor = { user_info : {} };
        vm.signUp = signUp;

        vm.hideMessage = hideMessage;
        vm.resetForm = resetForm;

        vm.msg = {
            isShown : false,
            type : 'danger',
            text : 'text'
        };

        vm.openAgreementModal = openAgreementModal;

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
                    // FIXME disable account check temperarily
                    /*if (!account) {
                        logger.error('signUp', 'Invalid account in response!');
                        return;
                    }*/

                    logger.log('signUp', 'Sign Up Succeeded');
                    // changed, now moving to account.signup.success state
                    $state.go('account.signup.success', { userType : userType.doctor });
                    // showSuccessMessage(SIGNUP_SUCCESS_MESSAGE);

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

            // TODO check doctor fields
            if (!vm.doctor.username || !vm.doctor.password || !vm.doctor.email || !vm.doctor.confirmPassword) {
                logger.error('signUp', 'Missing credentials: username, password, or email');
                logger.debug('signUp', 'Username: {0}, Password: {1}, Email: {2}, Confirm Password: {3}',
                                        [ vm.doctor.username, vm.doctor.password, vm.doctor.email, vm.doctor.confirmPassword ]);
                return;
            }

            if (vm.doctor.password !== vm.doctor.confirmPassword) {
                logger.error('signUp', 'Password should be the same as Confirm Password');
                logger.debug('signUp', 'Password: {0}, Confirm Password: {1}', [ vm.doctor.password, vm.doctor.confirmPassword ]);
                showFailMessage("密碼和再次輸入密碼不一致");
                return;
            }

            var info = vm.doctor.user_info;

            // FIXME gender field temperarily disabled
            // NOTE category is combined in title
            if (!info.name || !info.current_hospital || !info.title ||
                !info.college || !info.specialty || !info.available_time) {
                logger.error('signUp', 'Missing doctor info fields!');
            }

            if (!info.facebook_account) {
                info.facebook_account = '';
            }

            if (!info.blog_url) {
                info.blog_url = '';
            }

            console.log('doctorAccount= ' + JSON.stringify(vm.doctor, null, 2));
            logger.log('signUp', 'Doctor account information validation done! Signing Up ...');
            try {
                promise = memberDoctorService.createDoctor(vm.doctor);
                promise
                    .then(signUpSuccessCallback)
                    .catch(signUpFailCallback);
            } catch (error) {
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

        function openAgreementModal() {
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'app/account/signup/account-signup-doctor-agreement.html',
                windowClass: 'modal-fit',
                controller : ['$modalInstance', function($modalInstance) {
                    var vm = this;
                    vm.close = function() {
                        $modalInstance.close();
                    }
                }],
                controllerAs : 'vm',
                size: 'lg'
            });
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