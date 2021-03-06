(function() {
    'use strict';

    angular.module('app.account')
           .controller('accountMeController', accountMeController);

    accountMeController.$inject = [
        'myAccount',
        '$state',
        '$stateParams'
    ];

    function accountMeController(myAccount, $state, $stateParams) {
        var vm = this;

        // something is wrong
        if (!myAccount || !angular.isObject(myAccount)) {
            $state.go('home');
            return;
        }

        if (myAccount.user_type === 'USER') {
            var subState = $stateParams.detailCategory;

            if ($state.is('account.me.user.question') ||
                $state.is('account.me.user.favArticle') ||
                $state.is('account.me.user.favQA') ||
                $state.is('account.me.user.detail')   ||
                $state.is('account.me.user.edit') ||
                $state.is('account.me.user.setting')) {
                return;
            }

            if (subState === 'qa') {
                $state.go('account.me.user.question');
            } else if (subState === 'favArticle') {
                $state.go('account.me.user.favArticle');
            } else if (subState === 'favQA') {
                $state.go('account.me.user.favQA');
            } else if (subState === 'setting') {
                $state.go('account.me.user.setting')
            } else {
                $state.go('account.me.user.detail');
            }
            return;
        }

        if (myAccount.user_type === 'DOCTOR') {
            var subState = $stateParams.detailCategory;

            if ($state.is('account.me.doctor.answer')  ||
                $state.is('account.me.doctor.article') ||
                $state.is('account.me.doctor.detail')  ||
                $state.is('account.me.doctor.edit')    ||
                $state.is('account.me.doctor.setting')) {
                return;
            }

            if (subState === 'qa') {
                $state.go('account.me.doctor.answer');
            } else if (subState === 'blog') {
                $state.go('account.me.doctor.article');
            } else if (subState === 'setting') {
                $state.go('account.me.doctor.setting');
            } else {
                $state.go('account.me.doctor.detail');
            }
            return;
        }

        $state.go('home');
    }

})();