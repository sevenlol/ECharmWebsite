(function() {
	'use strict';

	angular.module('app.askdoctor')
           .controller('askdoctorHomeController', askdoctorHomeController);

    askdoctorHomeController.$inject = [
    	'askdoctorCategoryList'
    ];

    function askdoctorHomeController(askdoctorCategoryList) {
    	var vm = this;

    	vm.categoryList = askdoctorCategoryList;
    }

})();
