(function() {
    'use strict';

    angular.module('app.blog')
           .controller('blogDetailController', blogDetailController);

    blogDetailController.$inject = [
    ];

    function blogDetailController() {
        console.log('content.blog.detail');
    }

})();
