(function() {
    'use strict';

    angular.module('app.account')
           .controller('accountMeUserDetailController', accountMeUserDetailController);

    accountMeUserDetailController.$inject = [
        'user'
    ];

    function accountMeUserDetailController(user) {
        var MALE_STRING = 'MALE';
        var FEMALE_STRING = 'FEMALE';
        var ARBITRARY_GENDER_STRING = 'ARBITRARY';

        var vm = this;

        vm.GENDER_STRING = {
            MALE : MALE_STRING,
            FEMALE : FEMALE_STRING,
            ARBITRARY : ARBITRARY_GENDER_STRING
        };
        vm.user = user;
    }

})();