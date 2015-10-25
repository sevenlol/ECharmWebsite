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
                setPasswordChangeMsg('請先登入已進行此動作!', false, true);
                return;
            }

            if (!vm.oldPassword || !vm.newPassword || !vm.newPasswordConfirm) {
                setPasswordChangeMsg('請填寫所有需要的欄位!', false, true);
                return;
            }
            if (vm.newPassword !== vm.newPasswordConfirm) {
                setPasswordChangeMsg('新密碼和確認新密碼欄位不同!', false, true);
                return;
            }

            var successCallback = (function() {
                return function(res) {
                    if (res && res.status === 200) {
                        setPasswordChangeMsg('密碼變更成功!', true, true);
                    } else {
                        setPasswordChangeMsg('密碼變更失敗，請稍後重新嘗試!', false, true);
                    }
                };
            })();

            var failCallback = function(error) {
                if (!error) {
                    setPasswordChangeMsg('密碼變更失敗，請稍後重新嘗試!', false, true);
                    return;
                }

                if (error.status === 401) {
                    setPasswordChangeMsg('舊密碼輸入錯誤!', false, true);
                    return;
                }
                setPasswordChangeMsg('密碼變更失敗，請稍後重新嘗試!', false, true);
            };

            try {
                changeMyPassword(SERVER_URL, $rootScope.account.username, vm.oldPassword, vm.newPassword)
                    .then(successCallback)
                    .catch(failCallback);
            } catch(e) {
                setPasswordChangeMsg('密碼變更失敗，請稍後重新嘗試!', false, true);
            }
        }

        /* private functions */

        function setPasswordChangeMsg(msg, succeeded, showMsg) {
            var msgObj = {
                show : showMsg,
                type : succeeded ? 'success' : 'danger',
                message : msg
            };

            vm.passwordChangeMsg = msgObj;
        }

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
