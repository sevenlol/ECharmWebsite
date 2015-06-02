(function() {
    'use strict';

    angular.module('app.account')
           .controller('accountMeUserEditController', accountMeUserEditController);

    accountMeUserEditController.$inject = [
        'user',
        'memberUserService'
    ];

    function accountMeUserEditController(user, memberUserService) {
        var vm = this;

        vm.userInfo = user;
        vm.updateMyInfo = updateMyInfo;

        /* public functions */

        function updateMyInfo() {
            if (!vm.userInfo)
                return;

            var userAccount = {
                user_info : {}
            };

            var info = vm.userInfo.user_info;

            if (info.name) {
                userAccount.user_info.name = info.name;
                memberUserService.updateMeUser(userAccount);
            }

        }
    }

})();