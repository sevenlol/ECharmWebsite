(function() {
    'use strict';

    angular.module('app.blog', [
        'ngSanitize',
        'ui.router',
        'ui.bootstrap',
        'angular-parallax',
        'data.blog',
        'data.member',
        'data.favorite',
        'data.popular'
    ]);
})();