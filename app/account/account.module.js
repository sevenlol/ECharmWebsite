(function() {
    'use strict';

    angular.module('app.account', [
        'ui.router',
        'ui.bootstrap',
        'angular-parallax',
        'app.auth',
        'ny.logger',
        'data.account',
        'data.blog',
        'data.askdoctor',
        'data.member'
    ]);
})();