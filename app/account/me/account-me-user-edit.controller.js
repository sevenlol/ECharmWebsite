(function() {
    'use strict';

    angular.module('app.account')
           .controller('accountMeUserEditController', accountMeUserEditController);

    accountMeUserEditController.$inject = [
        'user'
    ];

    function accountMeUserEditController(user) {
        var vm = this;

        // TODO fix this
        vm.userInfo = null;
        vm.updateMyInfo = updateMyInfo;

        /* public functions */

        function updateMyInfo() {
            // body...
        }
    }

})();