(function() {
    'use strict';

    angular.module('app.account')
           .controller('accountMeDoctorArticleController', accountMeDoctorArticleController);

    accountMeDoctorArticleController.$inject = [
        'articleList'
    ];

    function accountMeDoctorArticleController(articleList) {
        var vm = this;

        vm.articleList = articleList;
    }

})();