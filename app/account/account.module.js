(function() {
    'use strict';

    angular.module('app.account', [
        'ui.router',
        'app.auth',
        'ny.logger',
        'data.account',
        'data.blog',
        'data.askdoctor',
        'data.member'
    ]);
})();