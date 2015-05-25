(function() {
    'use strict';

    angular.module('app.account')
           .controller('accountMeController', accountMeController);

    accountMeController.$inject = [
        'myAccount',
        '$state'
    ];

    function accountMeController(myAccount, $state) {
        var vm = this;

        // something is wrong
        if (!myAccount || !angular.isObject(myAccount)) {
            $state.go('home');
            return;
        }

        if (myAccount.user_type === 'USER') {
            $state.go('account.me.user.detail');
            return;
        }

        if (myAccount.user_type === 'DOCTOR') {
            $state.go('account.me.doctor.detail');
            return;
        }

        $state.go('home');
    }

})();