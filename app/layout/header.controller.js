(function() {
    'use strict';

    angular.module('app.layout')
           .controller('headerController', headerController);

    headerController.$inject = [
        'authService',
        '$rootScope'
    ];

    function headerController(authService, $rootScope) {
        var vm = this;

        vm.logout = logout;

        /* public functions */

        function logout() {
            // body...
        }
    }

})();