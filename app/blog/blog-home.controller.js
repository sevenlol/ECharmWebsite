(function() {
    'use strict';

    angular.module('app.blog')
           .controller('blogHomeController', blogHomeController);

    blogHomeController.$inject = [
    	'$stateParams',
        'blogCategoryList',
    ];

    function blogHomeController($stateParams, blogCategoryList) {
        var vm = this;

        vm.oneAccordionAtATime = true;
        vm.categoryList = blogCategoryList;
        vm.category = $stateParams ? $stateParams.category : 'all';
    }

})();
