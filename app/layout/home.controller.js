(function() {
    'use strict';

    angular.module('app.layout')
           .controller('homeController', homeController);

    homeController.$inject = [
        'authService',
        '$rootScope'
    ];

    function homeController(authService, $rootScope) {
    }

})();