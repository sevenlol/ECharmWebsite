(function() {
    'use strict';

    angular.module('app.blog')
           .controller('blogListController', blogListController);

    blogListController.$inject = [
        'articleList',
        'doctorList'
    ];

    function blogListController(articleList, doctorList) {
        var vm = this;

        // TODO fix this
        vm.articleList = null;
    }

})();
