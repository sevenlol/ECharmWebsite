(function() {
    'use strict';

    angular.module('app.doctor', [
        'ui.router',
        'app.value',
        'app.filter',
        'data.blog',
        'data.askdoctor',
        'data.member'
    ]);
})();