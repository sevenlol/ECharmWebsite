(function() {
    'use strict';

    angular.module('app.account', [
        'ui.router',
        'app.auth',
        'data.account',
        'data.member'
    ]);
})();