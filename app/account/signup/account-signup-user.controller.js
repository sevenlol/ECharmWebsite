(function() {
    'use strict';

    angular.module('app.account')
           .controller('accountSignUpUserController', accountSignUpUserController);

    accountSignUpUserController.$inject = [
        'userAccountService'
    ];

    function accountSignUpUserController(userAccountService) {
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
                        console.log('Invalid account');
                        return;
                    }

                    console.log('Sign Up Succeeded');
                    // created succeeded
                };
            })();

            var signUpFailCallback = (function() {
                return function(error) {
                    console.log('Sign Up Failed');

                    // if error message isn't empty
                    if (error.message)
                        console.log('Error Message: ' + error.message);
                };
            })();

            // TODO check input

            vm.credentials.account_type = 'ECHARM';
            vm.credentials.salt = 'salt';
            vm.credentials.created_at = (new Date()).toLocaleDateString();
            vm.credentials.user_info = {};

            try {
                promise = userAccountService.createUserAccount(vm.credentials);

                promise
                    .then(signUpSuccessCallback)
                    .catch(signUpFailCallback);
            } catch (err) {
                // TODO input error
                console.log('Input Error');
            }

        }
    }

})();