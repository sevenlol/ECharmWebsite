(function() {
    'use strict';

    angular.module('app.doctor')
           .controller('doctorListController', doctorListController);

    doctorListController.$inject = [
        'doctorList'
    ];

    function doctorListController(doctorList) {
        var vm = this;
        vm.doctorList = doctorList;
    }

})();
