(function() {
    'use strict';

    angular.module('app.account')
           .controller('accountMeUserDetailController', accountMeUserDetailController);

    accountMeUserDetailController.$inject = [
        'user'
    ];

    function accountMeUserDetailController(user) {
        var vm = this;

        // TODO fix this
        vm.userInfo = null;
    }

})();