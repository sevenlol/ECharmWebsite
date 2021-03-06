(function() {
    'use strict';

    angular.module('app.account', [
        'ui.router',
        'ui.bootstrap',
        'ui.select',
        'ngAnimate',
        'angular-parallax',
        'app.auth',
        'app.value',
        'app.filter',
        'ny.logger',
        'data.account',
        'data.blog',
        'data.askdoctor',
        'data.member',
        'data.favorite'
    ]);
})();