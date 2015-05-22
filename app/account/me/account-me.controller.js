(function() {
    'use strict';

    angular.module('app.account')
           .controller('accountMeController', accountMeController);

    accountMeController.$inject = [
        'myAccount'
    ];

    function accountMeController(myAccount) {
        var vm = this;
    }

})();