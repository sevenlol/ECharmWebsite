(function() {
    'use strict';

    angular.module('app.blog')
           .controller('blogListController', blogListController);

    blogListController.$inject = [
    ];

    function blogListController() {
        console.log('content.blog.list');
    }

})();
