(function() {
	'use strict';

	angular
		.module('app.account')
		.controller('accountMeUserController', accountMeUserController);

	accountMeUserController.$inject = [
		'user'
	];

	function accountMeUserController(user) {
		var vm = this;

		vm.user = user;
	}

})();
