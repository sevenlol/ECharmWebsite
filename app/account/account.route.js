(function() {
    'use strict';

    angular.module('app.account')
           .config(accountConfig);

    accountConfig.$inject = [
        '$stateProvider'
    ];

    function accountConfig($stateProvider) {
        // body...
    }

})();