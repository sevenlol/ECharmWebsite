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
		var MALE_STRING = 'MALE';
		var FEMALE_STRING = 'FEMALE';

		var vm = this;

		vm.GENDER_STRING = {
			MALE : MALE_STRING,
			FEMALE : FEMALE_STRING
		};
		vm.doctor = doctor;
		vm.avgAnswerRating = avgAnswerRating;
		vm.ratingMax = DEFAULT_RATING_MAX;
	}

})();
