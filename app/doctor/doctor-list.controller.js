(function() {
    'use strict';

    angular.module('app.doctor')
           .controller('doctorListController', doctorListController);

    doctorListController.$inject = [
        'doctorList',
        '$rootScope'
    ];

    function doctorListController(doctorList, $rootScope) {
        var vm = this;
        vm.doctorList = doctorList;
        console.log($rootScope.authenticated);
    }

})();
