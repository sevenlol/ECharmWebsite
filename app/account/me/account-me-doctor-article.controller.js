(function() {
    'use strict';

    angular.module('app.account')
           .controller('accountMeDoctorArticleController', accountMeDoctorArticleController);

    accountMeDoctorArticleController.$inject = [
        'articleList',
        'myAccount'
    ];

    function accountMeDoctorArticleController(articleList, myAccount) {
        var vm = this;

        vm.articleList = articleList;
        vm.doctorName = myAccount.user_info.name;

        vm.numberOfArticle = 0;
        if (angular.isArray(articleList) && articleList.length > 0) {
            vm.numberOfArticle = articleList.length;
        }
    }

})();