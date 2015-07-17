(function() {
	'use strict';

	angular
		.module('app.account')
		.controller('accountMeUserController', accountMeUserController);

	accountMeUserController.$inject = [
		'user'
	];

	function accountMeUserController(user) {
		var MALE_STRING = 'MALE';
		var FEMALE_STRING = 'FEMALE';

		var vm = this;

		vm.GENDER_STRING = {
			MALE : MALE_STRING,
			FEMALE : FEMALE_STRING
		};
		vm.user = user;
	}

})();
