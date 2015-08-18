(function() {
	'use strict';

	angular.module('app.askdoctor')
           .controller('askdoctorHomeController', askdoctorHomeController);

    askdoctorHomeController.$inject = [
    	'askdoctorCategoryList',
        'allPopularQAList'
    ];

    function askdoctorHomeController(askdoctorCategoryList, allPopularQAList) {
        var QUESTION_CONTENT_LIMIT = 15;
    	var vm = this;

    	vm.categoryList = askdoctorCategoryList;
        vm.allPopularQAList = parseAllPopularQAList(askdoctorCategoryList, allPopularQAList);
        vm.questionContentLimit = QUESTION_CONTENT_LIMIT;

        /* private functions */

        // TODO change the implementation
        function parseAllPopularQAList(categoryList, qaList) {
            return allPopularQAList;
        }
    }

})();
