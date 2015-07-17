(function() {
	'use strict';

	angular
		.module('app.account')
		.controller('accountMeDoctorController', accountMeDoctorController);

	accountMeDoctorController.$inject = [
		'doctor'
	];

	function accountMeDoctorController(doctor) {
		var vm = this;

		vm.doctor = doctor;
	}

})();
