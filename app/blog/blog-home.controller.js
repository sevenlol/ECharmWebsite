(function() {
    'use strict';

    angular.module('app.blog')
           .controller('blogHomeController', blogHomeController);

    blogHomeController.$inject = [
    ];

    function blogHomeController() {
        var vm = this;

        vm.oneAccordionAtATime = true;
    }

})();
