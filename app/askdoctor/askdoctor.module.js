(function() {
    'use strict';

    angular.module('app.askdoctor', [
        'ui.router',
        'ui.bootstrap',
        'duScroll',
        'app.auth',
        'app.filter',
        'app.value',
        'data.blog',
        'data.member',
        'data.askdoctor',
        'data.favorite',
        'data.popular'
    ]);

})();