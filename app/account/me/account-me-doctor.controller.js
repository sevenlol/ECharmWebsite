(function() {
	'use strict';

	angular
		.module('app.account')
		.controller('accountMeDoctorController', accountMeDoctorController);

	accountMeDoctorController.$inject = [
		'doctor',
		'avgAnswerRating'
	];

	function accountMeDoctorController(doctor, avgAnswerRating) {
		var DEFAULT_RATING_MAX = 5;

		var vm = this;

		vm.doctor = doctor;
		vm.avgAnswerRating = avgAnswerRating;
		vm.ratingMax = DEFAULT_RATING_MAX;
	}

})();
