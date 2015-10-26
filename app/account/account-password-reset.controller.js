(function() {
	'use strict';

	angular
		.module('app.account')
		.controller('accountPasswordResetController', accountPasswordResetController);

	accountPasswordResetController.$inject = [
		'$http',
        'valueService'
	];

	function accountPasswordResetController(
		$http,
        valueService) {

		var SERVER_URL = valueService.SERVER_URL.AUTH;

		var vm = this;

		vm.msg = {
            isShown : false,
            type : 'danger',
            text : 'text'
        };
		vm.submitted = false;
		vm.credentials = {};

		vm.resetForm = resetForm;
		vm.hideMessage = hideMessage;
		vm.resetMyPassword = resetMyPassword;

		/* public functions */

		function resetForm() {
            vm.submitted = false;
        }

        function hideMessage() {
            vm.msg.isShown = false;
        }

		function resetMyPassword() {

			vm.submitted = true;

			if (!vm.credentials.username || !vm.credentials.email) {
				return;
			}

			if (vm.passwordResetForm.username.$invalid ||
				vm.passwordResetForm.email.$invalid) {
				return;
			}

			var successCallback = function(res) {
				if (res && res.status === 200) {
					showMsg('重置密碼成功，新密碼將寄到您的信箱!', true);
				} else {
					showMsg('重置密碼失敗，請稍後重新嘗試!', false);
				}
			};

			var failCallback = function(error) {
				if (!error) {
					showMsg('重置密碼失敗，請稍後重新嘗試!', false);
					return;
				}

				if (error.status === 400) {
					showMsg('使用者帳號和信箱不符!', false);
					return;
				} else if (error.status === 404) {
					showMsg('使用者帳號不存在!', false);
					return;
				}
				showMsg('重置密碼失敗，請稍後重新嘗試!', false);
			};

			try {
				resetPassword(SERVER_URL, vm.credentials.username, vm.credentials.email)
					.then(successCallback)
					.catch(failCallback);
			} catch(e) {
				showMsg('重置密碼失敗，請稍後重新嘗試!', false);
			}
		}

		/* private functions */

		// FIXME move to shared service
		function resetPassword(baseUrl, username, email) {

			var url = baseUrl + '/me/reset_password';

			return $http.post(url, { username : username, email : email });
		}

		function showMsg(message, isSuccess) {
			vm.msg.isShown = true;
			vm.msg.type = isSuccess ? 'success' : 'danger';
			vm.msg.text = message;
		}
	}

})();
