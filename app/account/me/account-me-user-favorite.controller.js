(function() {
    'use strict';

    angular.module('app.account')
           .controller('accountMeUserFavoriteController', accountMeUserFavoriteController);

    accountMeUserFavoriteController.$inject = [
        'user'
    ];

    function accountMeUserFavoriteController(user) {
        var vm = this;

        // TODO fix this
        vm.articleList = null;
    }

})();