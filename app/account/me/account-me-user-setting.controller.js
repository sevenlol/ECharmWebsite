(function() {
    'use strict';

    angular
        .module('app.account')
        .controller('accountMeUserSettingController', accountMeUserSettingController);

    accountMeUserSettingController.$inject = [
        '$http',
        '$rootScope',
        'valueService'
    ];

    function accountMeUserSettingController(
        $http,
        $rootScope,
        valueService) {

        var SERVER_URL = valueService.SERVER_URL.AUTH;

        var vm = this;

        vm.passwordChangeMsg = {
            show : false,
            type : 'success',
            message : 'message'
        };
        vm.changePassword = changePassword;

        /* public functions */

        function changePassword() {

            if (!$rootScope.authenticated || !$rootScope.account ||
                !$rootScope.account.username) {
                console.log('Not logged in!');
                return;
            }

            if (!vm.oldPassword || !vm.newPassword || !vm.newPasswordConfirm) {
                console.log('Missing required fields!');
                return;
            }
            if (vm.newPassword !== vm.newPasswordConfirm) {
                console.log('New password wrong!');
                return;
            }

            var successCallback = (function() {
                return function(res) {
                    if (res && res.status === 200) {
                        console.log('Password Change Succeeded!');
                        console.log(JSON.stringify(res.data));
                    } else {
                        console.log('Password Change Failed!');
                        console.log('Status: ' + res.status);
                    }
                };
            })();

            var failCallback = function(error) {
                console.log('Password Change Failed!');
                console.log('Status: ' + error.status);
            };

            try {
                changeMyPassword(SERVER_URL, $rootScope.account.username, vm.oldPassword, vm.newPassword)
                    .then(successCallback)
                    .catch(failCallback);
            } catch(e) {
                console.log('Password Change Failed!');
                console.log('Something is wrong!');
            }
        }

        /* private functions */

        // FIXME change this to shared service
        function changeMyPassword(baseUrl, username, oldPassword, newPassword) {
            var url = baseUrl + '/me/password';

            var headers = {
                authorization : 'Basic ' + btoa(username + ':' + oldPassword)
            };

            return $http.put(url, { password : newPassword }, { headers : headers });
        }
    }

})();
